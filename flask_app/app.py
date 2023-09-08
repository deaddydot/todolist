from flask import Flask, jsonify, request, url_for, render_template, session, redirect
import json, requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import asc, desc
from bcrypt import hashpw, gensalt
from os import environ as env
from urllib.parse import quote_plus, urlencode
from dotenv import find_dotenv, load_dotenv


# prod server
# with open('/database.txt', 'r') as file:
#     text = file.readline().replace('\n', '').replace('\r', '').strip()
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://ubuntu:{text}@localhost/test1'

# local host
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:s0r8Jh7Qv4&m@localhost/todo'
db = SQLAlchemy(app)

app.app_context().push()

# Implement Auth0
from authlib.integrations.flask_client import OAuth
oauth = OAuth(app)

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# User class
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    auth0_id = db.Column(db.String(255), unique=True, nullable=True)  # Add this field
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
            "is_toggled": task.is_toggled,
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
    default_category = Category(name='Default', user_id=target.id)
    # add the category to the session
    db.session.add(default_category)
    # commit the transaction
    db.session.commit()

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

    # Create a new task object and add it to the database with the specified category
    task = Task(title=title, description=description, deadline=deadline, priority=3, category_id=category_id)
    db.session.add(task)
    db.session.commit()

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

    # Retrieve all tasks for the specified user_id
    tasks = Task.query.filter_by(user_id=user_id).all()

    # Create a list to hold the formatted task data
    task_list = []

    # Loop through the tasks and format each task
    for task in tasks:
        category = task.category  # Get the category associated with the task
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
    # Retrieve all tasks for a specific user, grouped by categories
    categories = db.session.query(Category).filter_by(user_id=user_id).all()
    categories_dict = {}
    for category in categories:
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
        db.session.commit()
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
    if "priority" in request.json:
        task.priority = request.json["priority"]
    if "category_id" in request.json:
        category_id = request.json["category_id"]
        category = Category.query.get(category_id)
        if category:
            task.category = category

    # Commit the changes to the database
    db.session.commit()

    # Return the updated task as a response
    return format_task(task, task.category)

# Get all categories for a user
@app.route("/categories/<int:user_id>", methods=["GET"])
def get_categories(user_id):
    categories = Category.query.filter_by(user_id=user_id).all()
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
    db.session.commit()

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
        db.session.commit()

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

        db.session.commit()

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
        db.session.commit()

        # Return the updated category status
        return jsonify({"message": "Category toggled successfully", "is_toggled": category.is_toggled}), 200
    else:
        return jsonify({"error": "Category not found"}), 404

# Get tasks with category filtering
@app.route("/tasks-by-filter/<int:user_id>", methods=["POST"])
def get_tasks_by_filter(user_id):
    # Retrieve all tasks for a specific user, filtered by toggled categories
    toggled_categories = Category.query.filter_by(user_id=user_id, is_toggled=True).all()
    toggled_category_ids = [category.id for category in toggled_categories]

    tasks = db.session.query(Task, Category).join(Category).filter(Category.user_id == user_id, Category.id.in_(toggled_category_ids)).order_by(asc(Task.deadline), desc(Task.id)).all()

    tasks_dict = {}  # Dictionary to hold tasks grouped by category

    for task, category in tasks:
        category_name = category.name
        if category_name not in tasks_dict:
            tasks_dict[category_name] = []
        tasks_dict[category_name].append(format_task(task, category))
    
    return jsonify(tasks_dict)

# Create User
def create_user(email, auth0_user_id):
    # Check if the user already exists in your database based on Auth0 user ID
    existing_user = User.query.filter_by(auth0_id=auth0_user_id).first()
    if not existing_user:
        # Create the user in your database
        new_user = User(email=email, auth0_id=auth0_user_id)
        db.session.add(new_user)
        db.session.commit()
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

# Auth0 login
@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("http://localhost:3000/auth0-callback", _external=True)
    )

# Import the session object at the top of your script
from flask import session

@app.route("/auth0-callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token

    # Get user's email and Auth0 user ID from the token
    user_email = token.get("email")
    auth0_user_id = token.get("sub")  # This is the Auth0 user ID

    # Create or retrieve the user in your database based on Auth0 user ID
    user = create_user(user_email, auth0_user_id)
    
    user_id = user.id  # This will give you the user's ID

    # Set the user ID in the session
    session["user_id"] = user_id

    # Redirect the user to the main application page with the user_id in the query parameter
    return redirect(url_for("main_page", user_id=user_id))

    

# Auth0 Logout
@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

@app.route("/app")
def main_page():
    # Retrieve the user ID from the query parameters
    user_id = request.args.get("user_id")

    # You can also access the user ID from the session if needed
    user_id_from_session = session.get("user_id")

    # Do any additional processing here

    # Return a response with the user ID
    return jsonify({"user_id": user_id})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)