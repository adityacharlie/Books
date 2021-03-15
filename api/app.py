from flask import request, jsonify
from . import create_app
from .models import db, Book
from .schemas import book_schema, books_schema


app = create_app()


@app.route('/books/')
def book_list():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return jsonify(result), 200


@app.route('/books/', methods=['POST'])
def create_book():
    json_data = request.get_json()
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
                language=language,
                publisher=publisher,
                genre=genre,
                quantity=quantity
                )

    db.session.add(book)
    db.session.commit()
    return book_schema.dump(book), 201


@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400

    book = Book.query.get(book_id)

    if not book:
        return {"message": "Book could not be found."}, 404

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

    return jsonify({"successful": "Book successfully Updated "}), 200


@app.route('/books/<int:book_id>', methods=["GET"])
def book_detail(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book could not be found."}), 404

    return book_schema.dump(book), 200


@app.route('/books/<int:book_id>', methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book:
        db.session.delete(book)
        db.session.commit()

        return jsonify({"successful": "Book successfully deleted "}), 204

    res = jsonify({"error": "Book not found"}), 404
    return res
