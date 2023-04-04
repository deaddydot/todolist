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

    def __repr__(self):
        return f"Category(name={self.name}, user_id={self.user_id})"

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

# Task class
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    deadline = db.Column(db.TIMESTAMP)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.Integer, default=3)

    def __repr__(self):
        return f"Task: {self.title}"
    
    def __init__(self, title, description, deadline, priority):
        self.title = title
        self.description = description
        self.deadline = deadline
        self.priority = priority

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
    
    # Create a new task object and add it to the database
    task = Task(title=title, description=description, deadline=deadline)
    db.session.add(task)
    db.session.commit()

    # Return the formatted task as a response
    return format_task(task)
    
# # Get all tasks
# @app.route("/tasks", methods=["GET"])
# def get_tasks():
#     tasks = Task.query.order_by(Task.id.asc()).all()
#     task_list = []
#     for task in tasks:
#         task_list.append(format_task(task))
#     return task_list

# # Get single task
# @app.route("/tasks/<id>", methods=["GET"])
# def get_task(id):
#     task = Task.query.filter_by(id=id).one()
#     formatted_task = format_task(task)
#     return formatted_task

# # Delete task
# @app.route("/tasks/<id>", methods=["DELETE"])
# def delete_task(id):
#     task = Task.query.filter_by(id=id).one()
#     db.session.delete(task)
#     db.session.commit()
#     return f'Task {id} deleted'
    
# # Edit task
# @app.route("/tasks/<id>", methods=["PUT"])
# def update_task(id):
#     task = Task.query.filterby(id=id).one()
#     description = request.json['description']
#     task.update(dict(description=description, created_at = datetime.utcnow()))
#     db.session.commit()
#     return task


    # # Return the updated data
    # return jsonify(
    #     {
    #         "id": id,
    #         "title": title,
    #         "description": description,
    #         "date": date,
    #         "completed": completed,
    #     }
    # )

# @app.route("/tasks/<int:id>", methods=["DELETE"])
# def delete_task(id):
#     # Delete the data from the database
#     conn = psycopg2.connect(**conn_params)
#     cursor = conn.cursor()
#     cursor.execute(
#         """
#         DELETE FROM test-schema.task
#         WHERE id=%s;
#         """,
#         (id,),
#     )
#     conn.commit()

    # Return a success message
    return jsonify({"message": "Task deleted successfully."})

if __name__ == "__main__":
    app.run()