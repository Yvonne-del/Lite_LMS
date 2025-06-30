from database import SessionLocal
import models

def seed_data():
    db = SessionLocal()

    # Seed Courses
    courses = [
        {"name": "Intro to Python", "code": "PY101", "semester": 1, "lecturer_id": 1},
        {"name": "Advanced Python", "code": "PY201", "semester": 2, "lecturer_id": 1},
        {"name": "Data Structures", "code": "CS101", "semester": 1, "lecturer_id": 2},
        {"name": "Algorithms", "code": "CS201", "semester": 2, "lecturer_id": 2},
        {"name": "Database Systems", "code": "DB301", "semester": 2, "lecturer_id": 1},
        {"name": "Web Development", "code": "WD101", "semester": 1, "lecturer_id": 2},
        {"name": "Machine Learning", "code": "ML401", "semester": 3, "lecturer_id": 1},
        {"name": "Cloud Computing", "code": "CC101", "semester": 3, "lecturer_id": 2},
        {"name": "DevOps", "code": "DO201", "semester": 4, "lecturer_id": 1},
        {"name": "Cybersecurity", "code": "CY101", "semester": 4, "lecturer_id": 2},
    ]
    for course in courses:
        db.add(models.Course(**course))
    db.commit()

    # Seed Lessons
    lessons = [
        {"title": "Variables & Data Types", "content": "Intro to Python basics", "course_id": 1},
        {"title": "Control Flow", "content": "if, for, while statements", "course_id": 1},
        {"title": "Linked Lists", "content": "Singly and Doubly Linked Lists", "course_id": 3},
        {"title": "Sorting Algorithms", "content": "Bubble, Merge, Quick sort", "course_id": 4},
        {"title": "SQL Basics", "content": "SELECT, INSERT, UPDATE, DELETE", "course_id": 5},
        {"title": "HTML/CSS", "content": "Structure and styling", "course_id": 6},
        {"title": "Supervised Learning", "content": "Classification, regression", "course_id": 7},
        {"title": "AWS Basics", "content": "EC2, S3, IAM roles", "course_id": 8},
        {"title": "CI/CD Pipelines", "content": "Jenkins, GitHub Actions", "course_id": 9},
        {"title": "Encryption Techniques", "content": "Symmetric vs Asymmetric", "course_id": 10},
    ]
    for lesson in lessons:
        db.add(models.Lesson(**lesson))
    db.commit()

    # Seed Assignments
    assignments = [
        {"title": "Python Basics Assignment", "description": "Variables and loops", "course_id": 1},
        {"title": "Advanced Functions", "description": "Decorators, lambda", "course_id": 2},
        {"title": "Data Structures Assignment", "description": "Linked lists and trees", "course_id": 3},
        {"title": "Algorithm Analysis", "description": "Time and space complexity", "course_id": 4},
        {"title": "Database Normalization", "description": "1NF, 2NF, 3NF exercises", "course_id": 5},
        {"title": "Web Form Project", "description": "Create a contact form with validation", "course_id": 6},
        {"title": "ML Model Project", "description": "Train and evaluate ML model", "course_id": 7},
        {"title": "Cloud Setup", "description": "Launch server on AWS", "course_id": 8},
        {"title": "DevOps Script", "description": "Create a deployment script", "course_id": 9},
        {"title": "Cybersecurity Report", "description": "Analyze recent security breach", "course_id": 10},
    ]
    for assignment in assignments:
        db.add(models.Assignment(**assignment))
    db.commit()

    db.close()
    print("✅ Seeded: 10 courses, 10 lessons, 10 assignments.")

if __name__ == "__main__":
    seed_data()