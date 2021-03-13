import flask
from flask import request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from models import Book
from schemas import BookSchema


app = flask.Flask(__name__)
app.config["DEBUG"] = True


# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://adityakotakonda:@localhost:5432/books"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]



@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    return jsonify(books)


@app.route('/books/')
def book_list():
    all_books = Book.query.all()
    print(all_books)
    return BookSchema.dumps(all_books)


@app.route('/books/', methods=['POST'])
def create_book():
    print(request)
    title = request.json.get('title', '')
    author = request.json.get('author', '')
    language = request.json.get('language', '')
    publisher = request.json.get('publisher', '')
    genre = request.json.get('genre', '')
    quantity = request.json.get('quantity', '')

    print(request.json)
    print(language)
    book = Book(title=title,
                author=author,
                # language=language
                publisher=publisher,
                # genre=genre,
                quantity=quantity
                )
    print(book)

    db.session.add(book)
    db.session.commit()

    return BookSchema.jsonify(book)
    # return {"status":"mentor initialization successful"}, 201


@app.route('/book/<int:book_id>/', methods=["GET"])
def book_detail(book_id):
    book = Book.query.get(book_id)
    book_schema = BookSchema()
    return book_schema.dump(book)


@app.route('/book/<int:book_id>/', methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book:
        print("aditya")
        db.session.delete(book)
        db.session.commit()
        res = jsonify({"successful": "Book successfully deleted"}), 204
        return res

    res = jsonify({"error": "Book not found"}), 404
    return res


if __name__ == '__main__':
    app.run()
