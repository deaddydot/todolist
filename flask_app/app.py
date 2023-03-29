from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:s0r8Jh7Qv4&m@localhost/test'
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"
    
    def __init__(self, description):
        self.description = description

def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at": event.created_at
    }

# Define your PostgreSQL connection parameters
conn_params = {
    "host": "localhost",
    "database": "test",
    "user": "postgres",
    "password": "s0r8Jh7Qv4&m",
}

# Define a route that queries the database
@app.route("/")
def hello():
    # Establish a connection to the database
    #conn = psycopg2.connect(**conn_params)
    #cursor = conn.cursor()

    # Execute a test SQL command
    #cursor.execute("SELECT version();")
    #row = cursor.fetchone()

    # Close the database connection
    #cursor.close()
    #conn.close()



    # Return the database version number
    return "Hello"

# Create event
@app.route("/events", methods=["POST"])
def create_event():
    # Extract the data from the request
    description = request.json["description"]
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

# Get all events
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return event_list

# Get single event
@app.route("/events/<id>", methods=["GET"])
def get_event(id):
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return formatted_event

# Delete event
@app.route("/events/<id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event {id} deleted'
    
# Edit event
@app.route("/events/<id>", methods=["PUT"])
def update_event(id):
    event = Event.query.filterby(id=id).one()
    description = request.json['description']
    event.update(dict(description=description, created_at = datetime.utcnow()))
    db.session.commit()
    return event

# def read_tasks():
#     # Query the data from the database
#     conn = psycopg2.connect(**conn_params)
#     cursor = conn.cursor()
#     cursor.execute(
#         """
#         SELECT id, title, description, date, completed
#         FROM test-schema.task;
#         """
#     )
#     rows = cursor.fetchall()

#     # Return the queried data
#     tasks = []
#     for row in rows:
#         task = {
#             "id": row[0],
#             "title": row[1],
#             "description": row[2],
#             "date": row[3],
#             "completed": row[4],
#         }
#         tasks.append(task)

#     return jsonify(tasks)

@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    # Extract the data from the request
    title = request.json["title"]
    description = request.json["description"]
    date = request.json["date"]
    completed = request.json["completed"]

    # Update the data in the database
    conn = psycopg2.connect(**conn_params)
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE test-schema.task
        SET title=%s, description=%s, date=%s, completed=%s
        WHERE id=%s;
        """,
        (title, description, date, completed, id),
    )
    conn.commit()

    # Return the updated data
    return jsonify(
        {
            "id": id,
            "title": title,
            "description": description,
            "date": date,
            "completed": completed,
        }
    )

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    # Delete the data from the database
    conn = psycopg2.connect(**conn_params)
    cursor = conn.cursor()
    cursor.execute(
        """
        DELETE FROM test-schema.task
        WHERE id=%s;
        """,
        (id,),
    )
    conn.commit()

    # Return a success message
    return jsonify({"message": "Task deleted successfully."})

if __name__ == "__main__":
    app.run()