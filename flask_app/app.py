from flask import Flask, jsonify, request, url_for, render_template, session, redirect, make_response, g
from functools import wraps
from jose import jwt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import asc, desc
from os import environ as env
from urllib.parse import quote_plus, urlencode
from dotenv import find_dotenv, load_dotenv
import json

# Initialize Flask and other components
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:100901huds@localhost/todo'
db = SQLAlchemy(app)
app.app_context().push()
app.secret_key = 'a18230ac162cd97951b1ee3945154fc1'

# Implement Auth0
from authlib.integrations.flask_client import OAuth
oauth = OAuth(app)

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# Custom decorator for requiring authentication
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = session.get("user_token")
        if not token:
            return jsonify({"error": "Authorization required"}), 401
        try:
            payload = jwt.decode(token["access_token"], env.get("AUTH0_CLIENT_SECRET"), algorithms=["RS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.JWTError:
            return jsonify({"error": "Invalid token"}), 401
        g.user = payload["email"]
        return f(*args, **kwargs)
    return decorated

# Secure your endpoints
@app.route("/secure")
@requires_auth
def secure():
    return f"This is a secure endpoint. Welcome, {g.user}!"

# User class
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    categories = db.relationship('Category', backref='user', lazy=True)


# Category class
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='category', lazy=True)
    is_toggled = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"Category(name={self.name}, color={self.color} user_id={self.user_id})"

    def get_default_category(self):
        default_category = Category.query.filter_by(name='Default', user_id=self.user_id).first()
        if default_category:
            return default_category
        return Category(name='Default', user_id=self.user_id)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color
        }

# Task class
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    deadline = db.Column(db.TIMESTAMP)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.Integer, default=3)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    #test_column = db.Column(db.Boolean, default=False)                                   # testing stuff
    

    def __repr__(self):
        return f"Task: {self.title}"
    
    def __init__(self, title, description, deadline, priority, category_id=None):
        self.title = title
        self.description = description
        self.priority = priority
        self.category_id = category_id
        self.deadline = deadline if deadline else None



def format_task(task, category):
    return {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "created_at": task.created_at,
            "deadline": task.deadline,
            "completed": task.completed,
            "category_id": task.category_id,
            #"test_column": task.completed,                                              # testing stuff
    }

# Define a route that queries the database
@app.route("/")
def hello():
    return "Hello"

# Handle Options requests
@app.route('/tasks', methods=['OPTIONS'])
def handle_options_request():
    # add any necessary headers here
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    return ('', 204, headers)

# Create a database when a new row is added to user table
@event.listens_for(User, 'after_insert')
def create_default_category(mapper, connection, target):
    # create a new category with default values
    default_category = Category(name='Default', user_id=target.id, color="#ff0000")
    # add the category to the session
    db.session.add(default_category)
    # commit the transaction
    # db.session.commit()

# Create task
@app.route("/tasks/<int:user_id>", methods=["POST"])
def create_task(user_id):
    # Extract the data from the request
    title = request.json["title"]
    description = request.json["description"]
    deadline = request.json["formattedDatetime"]
    category_id = request.json["category_id"]

    # Find the category for the given ID
    category = Category.query.get(category_id)
    
    if category is None:
        return jsonify({"error": "Category not found"}), 404

    # Create a new task object and add it to the database with the specified category
    task = Task(title=title, description=description, deadline=deadline, priority=3, category_id=category_id)
    db.session.add(task)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")

    # Retrieve all tasks for the user, grouped by categories
    categories = Category.query.filter_by(user_id=user_id).all()
    tasksByCategory = {}
    for category in categories:
        tasks = category.tasks
        formatted_tasks = [format_task(task, category) for task in tasks]
        tasksByCategory[category.name] = formatted_tasks

    # Return the updated tasksByCategory object as a response
    return jsonify(tasksByCategory)
    
# Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    # Retrieve the user_id from the session
    user_id = session.get("user_id")

    if user_id is None:
        # Handle the case where the user is not logged in or user_id is not in the session
        return jsonify({"error": "User not logged in"}), 401

    # Retrieve all tasks for the specified user_id by joining with the Category table
    tasks = db.session.query(Task, Category).join(Category).filter(Category.user_id == user_id).all()

    # Create a list to hold the formatted task data
    task_list = []

    # Loop through the tasks and format each task
    for task, category in tasks:
        formatted_task = format_task(task, category)  # Use your format_task function to format the task
        task_list.append(formatted_task)

    # Return the list of formatted tasks as JSON
    return jsonify(task_list)


# Get single task
@app.route("/task/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.filter_by(id=id).one_or_none()
    if task is None:
        return {"error": "Task not found"}, 404
    category = task.category
    formatted_task = format_task(task, category)
    return formatted_task

# Get all tasks by categories
@app.route("/tasks-by-categories/<int:user_id>", methods=["GET"])
def get_tasks_by_categories(user_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    # Convert string dates to datetime objects
    if start_date:
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    if end_date:
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

    categories = db.session.query(Category).filter_by(user_id=user_id).all()
    categories_dict = {}
    
    for category in categories:
        if start_date and end_date:
            tasks = [task for task in category.tasks if task.deadline.date() >= start_date and task.deadline.date() <= end_date]
        else:
            tasks = category.tasks

        formatted_tasks = [format_task(task, category) for task in tasks]
        categories_dict[category.name] = formatted_tasks

    return jsonify(categories_dict)

# Delete task
@app.route("/task/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.filter_by(id=id).first()
    if task:
        db.session.delete(task)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
        return f"Task {id} deleted"
    else:
        return f"Task {id} not found", 404
    
# Edit task
@app.route("/tasks-edit/<int:id>", methods=["PUT"])
def update_task(id):
    # Find the task in the database
    task = Task.query.filter_by(id=id).one()

    # Update the task with the new data from the request
    if "title" in request.json:
        task.title = request.json["title"]
    if "description" in request.json:
        task.description = request.json["description"]
    if "deadline" in request.json:
        task.deadline = request.json["deadline"]
    if "completed" in request.json:
        task.completed = request.json["completed"]
    #if "test_column" in request.json:                                                            # testing stuff
        #task.completed = request.json["test_column"]
    if "priority" in request.json:
        task.priority = request.json["priority"]
    if "category_id" in request.json:
        category_id = request.json["category_id"]
        category = Category.query.get(category_id)
        if category:
            task.category = category

    # Commit the changes to the database
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")

    # Return the updated task as a response
    return format_task(task, task.category)

# Get all categories for a user
@app.route("/categories/<int:user_id>", methods=["GET"])
def get_categories(user_id):
    categories = Category.query.filter_by(user_id=user_id).all()
    serialized_categories = [{"id": category.id, "name": category.name, "color": category.color, "is_toggled": category.is_toggled} for category in categories]
    print(serialized_categories)
    
    return jsonify([category.serialize() for category in categories])

# Create category
@app.route("/categories/<int:user_id>", methods=["POST"])
def create_category(user_id):
    # Extract the data from the request
    name = request.json["name"]
    color = request.json["color"]

    # Create a new category object
    category = Category(name=name, user_id=user_id, color=color, is_toggled = True)

    # Add the category to the database
    db.session.add(category)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")

    # Return the created category as a response
    return jsonify(category.serialize()), 201

# Get one category
@app.route("/category/<int:category_id>", methods=["GET"])
def get_category(category_id):
    category = Category.query.filter_by( id=category_id).first()
    if category:
        return jsonify(category.serialize())
    else:
        return jsonify({"error": "Category not found"}), 404

# Delete category
@app.route("/categories/<int:category_id>", methods=["DELETE"])
def delete_category(category_id):
    # Find the category in the database
    category = Category.query.get(category_id)

    if category:
        # Check if the category has any tasks
        has_tasks = db.session.query(Task.query.filter_by(category_id=category_id).exists()).scalar()

        if has_tasks:
            # Delete all tasks associated with the category
            Task.query.filter_by(category_id=category_id).delete()

        # Delete the category
        db.session.delete(category)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")

        return jsonify({"message": "Category and associated tasks deleted successfully"}), 200
    else:
        return jsonify({"error": "Category not found"}), 404



# Update category
@app.route("/categories/<int:category_id>", methods=["PUT"])
def update_category(category_id):
    # Find the category in the database
    category = Category.query.get(category_id)

    if category:
        # Extract the data from the request
        name = request.json.get("name")
        color = request.json.get("color")

        # Update the category attributes
        if name:
            category.name = name
        if color:
            category.color = color

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")

        return jsonify({"message": "Category updated successfully"}), 200
    else:
        return jsonify({"error": "Category not found"}), 404


# Update category toggle status
@app.route("/category/toggle/<int:category_id>", methods=["POST"])
def toggle_category(category_id):
    # Find the category in the database
    category = Category.query.get(category_id)

    if category:
        # Toggle the category's status
        category.is_toggled = not category.is_toggled
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")

        # Return the updated category status
        return jsonify({"message": "Category toggled successfully", "is_toggled": category.is_toggled}), 200
    else:
        return jsonify({"error": "Category not found"}), 404

# Create User
def create_user(email):
    # Check if the user already exists in your database based on Auth0 user ID
    existing_user = User.query.filter_by(email=email).first()
    if not existing_user:
        # Create the user in your database
        new_user = User(email=email)
        db.session.add(new_user)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
        return new_user
    else:
        return existing_user

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

# Import the session object at the top of your script
from flask import session

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token

    # Decode the JWT to get the user's email
    try:
        email = token['userinfo']['email']
    except Exception as e:
        print(f"Error decoding JWT: {e}")
        print("Received token:", token)
        return jsonify({"error": "Invalid token"}), 401 

    # Check if the user already exists in the database
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        user_id = existing_user.id
    else:
        # Create a new user
        new_user = User(email=email)
        db.session.add(new_user)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
        user_id = new_user.id

    # Create a response object
    response = make_response(redirect("http://localhost:3000/app"))


    # Set the 'userId' cookie to the user's ID with a 7-day expiration
    response.set_cookie('userId', str(user_id), max_age=604800)  # 604800 seconds = 7 days

    return response

# Auth0 Logout
@app.route("/logout")
def logout():
    # Clear Flask session
    session.clear()

    # Redirect to Auth0 for logout
    auth0_domain = env.get("AUTH0_DOMAIN")
    client_id = env.get("AUTH0_CLIENT_ID")
    return_to_url = "http://localhost:3000/app"  # This URL will handle React session clearing

    logout_url = (
        f"https://{auth0_domain}/v2/logout?"
        + urlencode(
            {"returnTo": return_to_url, "client_id": client_id},
            quote_via=quote_plus,
        )
    )

    # Create a response object for the redirect
    response = make_response(redirect(logout_url))

    # Set userId cookie to 0
    response.set_cookie('userId', '0')

    return response

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

@app.route("/app")
def main_page():
    # Retrieve the user ID from the query parameters
    user_id = request.args.get("user_id")

    # Return a response with the user ID
    return jsonify({"user_id": user_id})

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route("/is_authenticated", methods=["GET"])
def is_authenticated():
    token = session.get("user")
    if token:
        return jsonify({"isAuthenticated": True}), 200
    else:
        return jsonify({"isAuthenticated": False}), 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 5000))