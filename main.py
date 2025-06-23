from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

class User(BaseModel):
    email: str
    password: str
@app.post("/register")
def register_user(user: User):
    return user

@app.post("/login")
def login_user(email: str, password: str):
    return {"email": email, "password": password}

@app.post("/assignments/{assignment_id}")
def submit_assignment(assignment_id: int, file: UploadFile = File(...)):
    return {"assignment_id": assignment_id, "filename": file.filename}

@app.get("/assignments/{assignment_id}")
def get_assignment(assignment_id: int):
    return {"assignment_id": assignment_id}

@app.get("/courses")
def get_courses():
    return {"courses": ["course1", "course2", "course3"]}

@app.get("/courses/{course_id}")
def get_course(course_id: int):
    return {"course_id": course_id}

@app.put("/assignments/{assignment_id}")
def update_assignment(assignment_id: int, file: Union[str, None] = None):
    return {"assignment_id": assignment_id, "file": file}

@app.put("/profile")
def update_profile(email: str, password: str):
    return {"email": email, "password": password}

@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    return {"course_id": course_id}