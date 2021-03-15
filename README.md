# Books

Clone the repository to your preferred location.

Create virtualenv and install all the packages in requirements.txt

pip install -r requirements.txt

Go to the api/ on your terminal and run

export FLASK_APP=app.py

These variables need to get passed as environment variables to the Flask app
to use the local postgres database or postgres docker instance

```text
export POSTGRES_USER=testuser
export POSTGRES_PASSWORD=password
export POSTGRES_HOST=postgres
export POSTGRES_PORT=5432
export POSTGRES_DB=books
```
*replace these to your database connection variables

Ensure the same values are set in database.conf used to create the postgres docker instance

flask run


