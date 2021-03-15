# Books

Please run 

pip install -r requirements.txt

Go to the api/ folder and run

export FLASK_APP=app.py

These variables that need to get passed as environment variables to the Flask app
to use the local postgres database or postgres docker instance

```text
export POSTGRES_USER=test
export POSTGRES_PASSWORD=password
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_DB=example
```
*replace these to your database connection variables

Ensure the same values are set in database.conf used to create the postgres docker instance

flask run


