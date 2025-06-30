# Lite_LMS (Learning Management System)

Lite LMS is a lightweight web application for managing courses, assignments, lessons, and submissions. It supports both **students** and **lecturers**, offering role-based access to dashboards and content.

## Features

- Lecturer login and dashboard
- Student login and dashboard
- Course & lesson management
- Assignment creation and submission
- JWT-based authentication (secure login)
- Role-based access control
- Backend API built with FastAPI + SQLAlchemy
- Ready for deployment on Render or Fly.io

---

## Project Structure
```bash
Lite_LMS/
├─Frontend/
├── backend/
│ ├── main.py
│ ├── models.py 
│ ├── routes.py
│ ├── auth.py 
│ ├── database.py 
│ └── schemas.py 
├── seed.py 
├── requirements.txt
├── start.sh 
├── README.md
```


---

## Authentication

- Login via JWT tokens using `/token`
- Protected routes:
  - `require_student`
  - `require_lecturer`

---

##  API Endpoints

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/register`        | Register user          |
| POST   | `/token`           | Login + JWT token      |
| GET    | `/courses`         | List all courses       |
| GET    | `/lessons/{id}`    | View lesson            |
| POST   | `/assignments/`    | Add assignment (lecturer) |
| POST   | `/submissions/`    | Submit assignment (student) |

---

## Local Setup

```bash
# 1. Clone the project
git clone https://github.com/Yvonne_del/Lite_LMS.git
cd Lite_LMS

# 2. Create & activate virtual env
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run seed script (optional)
python seed.py

# 5. Start dev server
uvicorn backend.main:app --reload
```

# Deployment (Render)

## Make sure you have:
- start.sh file (with gunicorn command)
- requirements.txt with gunicorn, uvicorn, fastapi

## Push to GitHub, then:
- Go to https://render.com
- New → Web Service
- Set build & start commands:
  Build: pip install -r requirements.txt
  Start: ./start.sh

## Tech Stack
- FastAPI – modern Python web framework
- SQLAlchemy – ORM for database models
- Pydantic – Data validation
- JWT – Authentication
- SQLite (dev) / PostgreSQL (prod)

## Author
- Yvonne Njoroge
- William Wambugu