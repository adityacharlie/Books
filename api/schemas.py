from .models import Book
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_relationships = True
        load_instance = True


book_schema = BookSchema()
books_schema = BookSchema(many=True)
