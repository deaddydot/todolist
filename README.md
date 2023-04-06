# Tasktastic

Tasktastic is a simple task management application built with React, Flask, and Postgres. The app allows users to create, read, update, and delete tasks, as well as assign tasks to categories.

## Prerequisites
Before you can run Tasktastic on your machine, you will need to have the following installed:
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
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
yarn install
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
yarn start
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
