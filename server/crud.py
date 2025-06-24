from sqlalchemy.orm import Session
from . import models, schemas

# ========== USERS ==========

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    new_user = models.User(email=user.email, password=user.password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ========== COURSES ==========

def create_course(db: Session, course: schemas.CourseCreate):
    new_course = models.Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def get_all_courses(db: Session):
    return db.query(models.Course).all()

def get_course_by_id(db: Session, course_id: int):
    return db.query(models.Course).filter(models.Course.id == course_id).first()

# ========== LESSONS ==========

def create_lesson(db: Session, lesson: schemas.LessonCreate):
    new_lesson = models.Lesson(**lesson.dict())
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson

def get_lesson_by_id(db: Session, lesson_id: int):
    return db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()

# ========== ASSIGNMENTS ==========

def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    new_assignment = models.Assignment(**assignment.dict())
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

def get_assignment_by_id(db: Session, assignment_id: int):
    return db.query(models.Assignment).filter(models.Assignment.id == assignment_id).first()

# ========== SUBMISSIONS ==========

def create_submission(db: Session, submission: schemas.SubmissionCreate):
    new_submission = models.Submission(**submission.dict())
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

def get_submission_by_id(db: Session, submission_id: int):
    return db.query(models.Submission).filter(models.Submission.id == submission_id).first()
