from sqlalchemy import Table, Column, Integer, String, ForeignKey, Text, DateTime, Boolean
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
from sqlalchemy import Date

Base = declarative_base()

enrollments = Table(
    "enrollments",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("course_id", Integer, ForeignKey("courses.id"))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name= Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="student")  # student or lecturer

    submissions = relationship("Submission", back_populates="user")
    courses = relationship("Course", back_populates="teacher")
    courses_enrolled = relationship(
        "Course",
        secondary="enrollments",
        back_populates="students"
    )


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False)
    semester = Column(Integer)
    teacher_id = Column(Integer, ForeignKey("users.id"))

    teacher = relationship("User", back_populates="courses")
    assignments = relationship("Assignment", back_populates="course")
    lessons = relationship("Lesson", back_populates="course") 
    students = relationship(
        "User",
        secondary="enrollments",
        back_populates="courses_enrolled"
    )


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(Text)
    video_url = Column(String, nullable=True)
    course_id = Column(Integer, ForeignKey("courses.id"))

    course = relationship("Course", back_populates="lessons")

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    due_date = Column(Date)
    course_id = Column(Integer, ForeignKey("courses.id"))

    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True)
    file_path = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    reviewed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    assignment_id = Column(Integer, ForeignKey("assignments.id"))

    user = relationship("User", back_populates="submissions")
    assignment = relationship("Assignment", back_populates="submissions")

    def __repr__(self):
        return f"Submission(id={self.id}, file_path={self.file_path}, timestamp={self.timestamp}, user_id={self.user_id}, assignment_id={self.assignment_id})"