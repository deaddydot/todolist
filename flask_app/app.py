from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:ubuntu@3.129.218.132/test1'

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
        self.deadline = deadline
        self.priority = priority
        self.category_id = category_id or self.category.get_default_category().id


def format_task(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "created_at": task.created_at,
        "deadline": task.deadline,
        "completed": task.completed
    }

# Define a route that queries the database
@app.route("/")
def hello():
    return "Hello"

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
@app.route("/tasks", methods=["POST"])
def create_task():
    # Extract the data from the request
    title = request.json["title"]
    description = request.json["description"]
    deadline = request.json["deadline"]
    user_id = request.json["user_id"]

    # Find the default category for the user
    default_category = Category.query.filter_by(user_id=user_id, name='Default').first()

    # Create a new task object and add it to the database with the default category
    task = Task(title=title, description=description, deadline=deadline, category=default_category)
    db.session.add(task)
    db.session.commit()

    # Return the formatted task as a response
    return format_task(task)
    
# Get all tasks
@app.route("/tasks/<int:user_id>", methods=["GET"])
def get_tasks(user_id):
    # Retrieve all tasks for a specific user
    tasks = Task.query.filter_by(user_id=user_id).order_by(Task.id.asc()).all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return jsonify(task_list)

# Get single task
@app.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.filter_by(id=id).one_or_none()
    if task is None:
        return {"error": "Task not found"}, 404
    formatted_task = format_task(task)
    return formatted_task

# Delete task
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.filter_by(id=id).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return f"Task {id} deleted"
    else:
        return f"Task {id} not found", 404
    
# Edit task
@app.route("/tasks/<id>", methods=["PUT"])
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

    # Commit the changes to the database
    db.session.commit()

    # Return the updated task as a response
    return format_task(task)

if __name__ == "__main__":
    app.run()