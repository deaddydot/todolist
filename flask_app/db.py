from flask import Flask, jsonify, request
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="test",
    user="postgres",
    password="s0r8Jh7Qv4&m"
)

app = Flask(__name__)

# Route to get tasks
@app.route('/todos', methods=['GET'])
def get_todos():
    cur = conn.cursor()
    cur.execute("SELECT * FROM todos")
    rows = cur.fetchall()
    todos = []
    for row in rows:
        todos.append({
            'id': row[0],
            'title': row[1],
            'completed': row[2]
        })
    cur.close()
    return jsonify(todos)

# Route to add new tasks
@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.json
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO todos (title, completed) VALUES (%s, %s) RETURNING id",
        (data['title'], data['completed'])
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    return jsonify({'id': new_id})

# Route to delete tasks
@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    cur = conn.cursor()
    cur.execute("DELETE FROM todos WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)