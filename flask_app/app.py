from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('/database.txt', 'r') as file:
    text = file.readline().replace('\n', '').replace('\r', '').strip()

# prod server
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://ubuntu:{text}@localhost/test1'

# local host
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:ubuntu@localhost/test1'


db = SQLAlchemy(app)

app.app_context().push()

# User class
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    categories = db.relationship('Category', backref='user', lazy=True)

# Category class
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='category', lazy=True)

    def __repr__(self):
        return f"Category(name={self.name}, user_id={self.user_id})"

    def get_default_category(self):
        default_category = Category.query.filter_by(name='Default', user_id=self.user_id).first()
        if default_category:
            return default_category
        return Category(name='Default', user_id=self.user_id)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
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
@app.route("/tasks/<int:user_id>", methods=["GET"])
def get_tasks(user_id):
    # Retrieve all tasks for a specific user
    tasks = db.session.query(Task, Category).join(Category).filter(Category.user_id == user_id).order_by(Task.id.asc()).all()
    task_list = []
    for task, category in tasks:
        task_list.append(format_task(task, category))
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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)