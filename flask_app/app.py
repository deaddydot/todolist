from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'
db = SQLAlchemy(app)

# Define Game model
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    developer = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.Date, nullable=False)  # Assume release_date is a date field
    genre = db.Column(db.String(20), nullable=False)
    platform = db.Column(db.String(20), nullable=False)

    reviews = db.relationship('Review', backref='game', lazy=True)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)
    #relation
    reviews = db.relationship('Review', backref='user', lazy=True)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

# Define Review model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    #relation
    game = db.relationship('Game', backref=db.backref('reviews', lazy=True))
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))


# Define Favorites model
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    #relation
    user = db.relationship('User', backref=db.backref('favorites', lazy=True))
    game = db.relationship('Game', backref=db.backref('favorites', lazy=True))

# API endpoint to get all games
@app.route('/games', methods=['GET'])
def get_all_games():
    games = Game.query.all()
    game_list = []
    for game in games:
        game_list.append({
            'id': game.id,
            'title': game.title,
            'developer': game.developer,
            'release_date': game.release_date,
            'genre': game.genre,
            'platform': game.platform
        })
    return jsonify({'games': game_list})

# API endpoint to get a specific game by ID
@app.route('/games/<int:game_id>', methods=['GET'])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    if game:
        return jsonify({
            'id': game.id,
            'title': game.title,
            'developer': game.developer,
            'release_date': game.release_date,
            'genre': game.genre,
            'platform': game.platform
        })
    else:
        return jsonify({'message': 'Game not found'}), 404

#crude operation for second table users
# API endpoint to create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# API endpoint to get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify({'users': user_list})

# API endpoint to get a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
    else:
        return jsonify({'message': 'User not found'}), 404
    
# Crude operation for table review
# API endpoint to create a new review
@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    new_review = Review(rating=data['rating'], comments=data['comments'], game_id=data['game_id'], user_id=data['user_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully'}), 201

# API endpoint to get all reviews
@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    review_list = [{'id': review.id, 'rating': review.rating, 'comments': review.comments,
                    'game_id': review.game_id, 'user_id': review.user_id} for review in reviews]
    return jsonify({'reviews': review_list})

#crude operation for table favorite
# API endpoint to add a game to favorites
@app.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    new_favorite = Favorites(game_id=data['game_id'], user_id=data['user_id'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'message': 'Game added to favorites successfully'}), 201

# API endpoint to get all favorites
@app.route('/favorites', methods=['GET'])
def get_all_favorites():
    favorites = Favorites.query.all()
    favorites_list = [{'id': favorite.id, 'game_id': favorite.game_id, 'user_id': favorite.user_id} for favorite in favorites]
    return jsonify({'favorites': favorites_list})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)