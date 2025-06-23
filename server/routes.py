from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server import models, schemas
from server.database import SessionLocal, engine
from typing import List
#Python 3.8 does not support list[T]. That feature (PEP 585) was introduced in Python 3.9.
models.Base.metadata.create_all(bind=engine)

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#========USERS=========
@router.post("/register", response_model=schemas.UserOut)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(email=user.email, password=user.password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

#======COURSES======
@router.post("/courses", response_model=schemas.CourseOut)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    new_course = models.Course(course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.get("/courses", response_model=List[schemas.CourseOut])
def get_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()

@router.get("/courses/{course_id}", response_model=schemas.CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

#========LESSONS=========
@router.post("/lessons", response_model=schemas.LessonOut)
def create_lesson(lesson: schemas.LessonCreate, db: Session = Depends(get_db)):
    new_lesson = models.Lesson(**lesson.dict())
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson

@router.get("/lessons/{lesson_id}", response_model=schemas.LessonOut)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

#=======ASSIGNMENTS=======
@router.post("/assignments", response_model=schemas.AssignmentOut)
def create_assignment(assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    new_assignment = models.Assignment(**assignment.dict())
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

@router.get("/assignments/{assignment_id}", response_model=schemas.AssignmentOut)
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(models.Assignment).get(assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment


#=======SUBMISSIONS=======

@router.post("/submissions", response_model=schemas.SubmissionOut)
def submit_assignment(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    new_submission = models.Submission(**submission.dict())
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

@router.get("/submissions/{submission_id}", response_model=schemas.SubmissionOut)
def get_submission(submission_id: int, db: Session = Depends(get_db)):
    submission = db.query(models.Submission).get(submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission
