from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

#------users-------
class UserBase(BaseModel):
    email: EmailStr
    name: str 
    role: str = "student"  # 'student' or 'teacher'

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(UserBase):
    id: int

    model_config = {
        "from_attributes" : True
    }
#------courses-------
class CourseBase(BaseModel):
    name: str
    code: str
    semester: Optional[int] = None

class CourseCreate(CourseBase):
    teacher_id: int

class CourseOut(CourseBase):
    id: int
    teacher_id: int

    model_config = {
        "from_attributes" : True
    }
#------lessons-------
class LessonBase(BaseModel):
    title: str
    content: Optional[str] = None
    video_url: Optional[str] = None

class LessonCreate(LessonBase):
    course_id: int

class LessonOut(LessonBase):
    id: int
    course_id: int

model_config = {
        "from_attributes" : True
    }
#------assignments-------
class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None

class AssignmentCreate(AssignmentBase):
    course_id: int

class AssignmentOut(AssignmentBase):
    id: int
    course_id: int

    model_config = {
        "from_attributes" : True
    }
#------submissions-------

class SubmissionBase(BaseModel):
    file_path: Optional[str] = None

class SubmissionCreate(SubmissionBase):
    user_id: int
    assignment_id: int

class SubmissionOut(SubmissionBase):
    id: int
    user_id: int
    assignment_id: int
    timestamp: datetime

    model_config = {
        "from_attributes" : True
    }