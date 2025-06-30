from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from datetime import date
from typing import List

#------users-------
class UserBase(BaseModel):
    email: EmailStr
    name: str 
    role: str = "student"  # 'student' or 'teacher'
    model_config = {
        "from_attributes": True
    }
    
class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(UserBase):
    id: int
    name: str
    email: str

    model_config = {"from_attributes": True}
#------courses-------
class CourseBase(BaseModel):
    name: str
    code: str
    semester: Optional[int] = None

class CourseCreate(CourseBase):
    teacher_id: int


class LessonBase(BaseModel):
    title: str
    content: Optional[str] = None
    video_url: Optional[str] = None

class LessonCreate(LessonBase):
    course_id: int

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class LessonOut(LessonBase):
    id: int
    course_id: int

    model_config = {
            "from_attributes" : True
        }

class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None

    model_config = {
        "from_attributes": True
    }

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

class SubmissionOut(BaseModel):
    id: int
    file_path: str
    timestamp: datetime
    reviewed: bool
    user_id: int
    assignment_id: int

    model_config = {"from_attributes": True}

class CourseOut(CourseBase):
    id: int
    teacher_id: int
    semester: int
    teacher: Optional[UserOut]
    assignments: List[AssignmentOut] = []
    lessons: List[LessonOut] = []
    students: List[UserOut] = []

    model_config = {
        "from_attributes": True
    }