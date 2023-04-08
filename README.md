# Tasktastic
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

Tasktastic is a simple task management application built with React, Flask, and Postgres. The app allows users to create, read, update, and delete tasks, as well as assign tasks to categories. 

## Prerequisites
Before you can run Tasktastic on your machine, you will need to have the following installed:
- [Node.js](https://nodejs.org/en/)
- [Python](https://www.python.org/downloads/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

Clone the repository:

`
git clone https://github.com/deaddydot/todolist.git
`

Change into the project directory:

`
cd todolist
`

Install the frontend dependencies:

`
npm install react react-bootstrap axios react-scripts
`

Install the backend dependencies:

`
pip install -r requirements.txt
`

Create a new Postgres database:

`
createdb test1
`

Initialize the database schema:

`
python manage.py initdb
`

Start the Flask server:

`
flask run
`

Start the React development server:

`
npm start
`

Open Tasktastic in your browser: 

`
http://localhost:3000
`

## Usage
Tasktastic allows users to create, read, update, and delete tasks. Users can also assign tasks to categories.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Team members
- Jack Carver: Team lead, Front-end developer
- Drew Nguyen: Back-end developer, database specialist
- Long Ta: Back End developer, authentication specialist
- Hudson Bailey: Front-end developer
