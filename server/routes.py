from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .auth import verify_password, create_access_token,decode_access_token, require_student, require_lecturer
from sqlalchemy.orm import Session
from server import models, schemas
from server.database import SessionLocal, engine
from typing import List 
from server.auth import get_password_hash


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

    hashed_password = get_password_hash(user.password) 

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,  # store hashed password
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {
    "access_token": token,
    "token_type": "bearer",
    "user": {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role
    }
}



#======COURSES======
@router.post("/courses", response_model=schemas.CourseOut)
def create_course(
    course: schemas.CourseCreate,
    _=Depends(require_lecturer), #role check
    db: Session = Depends(get_db)         #db session  
):
    new_course = models.Course(**course.model_dump())
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

@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"detail": f"Course {course_id} has been deleted successfully."}

#========LESSONS=========
@router.post("/lessons", response_model=schemas.LessonOut)
def create_lesson(
    lesson: schemas.LessonCreate,
    _=Depends(require_lecturer),   #Just triggering the dependency
    db: Session = Depends(get_db)           
):
    new_lesson = models.Lesson(**lesson.model_dump())
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson

@router.get("/lessons", response_model=List[schemas.LessonOut])
def get_lessons(db: Session = Depends(get_db)):
    return db.query(models.Lesson).all()

@router.get("/lessons/{lesson_id}", response_model=List[schemas.LessonOut])
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).get(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

#=======ASSIGNMENTS=======
@router.post("/assignments", response_model=schemas.AssignmentOut)
def create_assignment(
assignment: schemas.AssignmentCreate,
    _=Depends(require_lecturer),   #Just triggering the dependency
    db: Session = Depends(get_db)           
):
    new_assignment = models.Assignment(**assignment.model_dump())
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
def create_submission(
    submission: schemas.SubmissionCreate,
    _=Depends(require_student),
    db: Session = Depends(get_db)
):
    new_submission = models.Submission(**submission.model_dump())
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

@router.get("/submission", response_model=List[schemas.SubmissionOut])
def get_submissions(
    _=Depends(require_lecturer),
    db: Session = Depends(get_db)
):
    return db.query(models.Submission).all()

@router.get("/submissions/{submission_id}", response_model=schemas.SubmissionOut)
def get_submission(submission_id: int, 
        _=Depends(require_lecturer),
        db: Session = Depends(get_db)):
    submission = db.get(models.Submission, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission
