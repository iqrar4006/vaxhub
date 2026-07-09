## Django REST Framework Complete Authentication API with Simple JWT

#### There is a File "DjangoAuthAPI.postman_collection" which has Postman Collection You can import this file in your postman to test this API

## Prerequisites

Before running the project, make sure you have installed:

- Python 3.10 or above
- pip
- Git

---

# Create a Virtual Environment


### Windows

```bash
python -m venv doc_pat
```

Activate it:

```bash
doc_pat\Scripts\activate
```


---

# Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a file named **.env** inside the `django_server` directory.

Example:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
```

---

# Database Setup

The migration files are already included in this repository.

Create the SQLite database by running:

```bash
python manage.py migrate
```

This command automatically creates the **db.sqlite3** database and all required tables.

---

# Run the Server

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```




## To Run this Project these are the importatnt command:
```bash
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
