import flask_sqlalchemy
from datetime import datetime

db = flask_sqlalchemy.SQLAlchemy()


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
