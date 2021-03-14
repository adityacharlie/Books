import flask
from flask import request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from datetime import datetime

app = flask.Flask(__name__)
app.config["DEBUG"] = True


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://book:94kyvq1@postgres:5432/books"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route('/books/')
def book_list():
    all_books = Book.query.all()
    print(all_books)
    result = books_schema.dump(all_books)
    return jsonify(result)


@app.route('/books/', methods=['POST'])
def create_book():
    json_data = request.get_json()
    print(json_data)
    if not json_data:
        return {"message": "No input data provided"}, 400

    title = request.json.get('title', '')
    author = request.json.get('author', '')
    language = request.json.get('language', '')
    publisher = request.json.get('publisher', '')
    genre = request.json.get('genre', '')
    quantity = request.json.get('quantity', '')


    book = Book(title=title,
                author=author,
                # language=language,
                publisher=publisher,
                # genre=genre,
                quantity=quantity
                )
    print(book)

    db.session.add(book)
    db.session.commit()

    return book_schema.dump(book)


@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    print(book_id)
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400

    book = Book.query.get(book_id)

    if not book:
        return {"message": "Book could not be found."}, 400

    title = request.json.get('title', '')
    author = request.json.get('author', '')
    language = request.json.get('language', '')
    publisher = request.json.get('publisher', '')
    genre = request.json.get('genre', '')
    quantity = request.json.get('quantity', '')

    book.title = title
    book.author = author
    book.language = language
    book.publisher = publisher
    book.genre = genre
    book.quantity = quantity

    db.session.commit()

    return book_schema.dump(book)


@app.route('/books/<int:book_id>', methods=["GET"])
def book_detail(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book could not be found."}), 400

    book_schema = BookSchema()
    return book_schema.dump(book)


@app.route('/books/<int:book_id>', methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book:
        db.session.delete(book)
        db.session.commit()

        return jsonify({"successful": "Book successfully deleted "}), 204

    res = jsonify({"error": "Book not found"}), 404
    return res


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), index=True)
    author = db.Column(db.String(100), index=True)
    language = db.Column(db.String(100))
    publisher = db.Column(db.String(100), index=True)
    genre = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    created = db.Column(db.Date, default=datetime.today())

    def __init__(self, title, author, publisher, quantity):
        self.title = title
        self.author = author
        self.publisher = publisher
        self.quantity = quantity


class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_relationships = True
        load_instance = True


book_schema = BookSchema()
books_schema = BookSchema(many=True)


if __name__ == '__main__':
    app.run()
