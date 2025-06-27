from database import SessionLocal
import models

def seed_data():
    db = SessionLocal()

    courses = [
        {"name": "Intro to Python", "code": "PY101", "semester": 1, "lecturer_id": 1},
        {"name": "Advanced Python", "code": "PY201", "semester": 2, "lecturer_id": 1},
        {"name": "Data Structures", "code": "CS101", "semester": 1, "lecturer_id": 2},
        {"name": "Algorithms", "code": "CS201", "semester": 2, "lecturer_id": 2},
        {"name": "Database Systems", "code": "DB301", "semester": 2, "lecturer_id": 1},
        {"name": "Web Development", "code": "WD101", "semester": 1, "lecturer_id": 2},
        {"name": "Machine Learning", "code": "ML401", "semester": 3, "lecturer_id": 1},
    ]
    for course in courses:
        db.add(models.Course(**course))
    db.commit()

    # Seed Lessons
    lessons = [
        {"title": "Variables & Data Types", "content": "Intro to Python basics", "course_id": 1},
        {"title": "Control Flow", "content": "if, for, while statements", "course_id": 1},
        {"title": "Linked Lists", "content": "Singly and Doubly Linked Lists", "course_id": 3},
    ]
    for lesson in lessons:
        db.add(models.Lesson(**lesson))
    db.commit()

    # Seed Assignments
    assignments = [
        {"title": "Python Basics Assignment", "description": "Variables and loops", "course_id": 1},
        {"title": "Data Structures Assignment", "description": "Linked lists and trees", "course_id": 3},
        {"title": "Database Normalization", "description": "1NF, 2NF, 3NF exercises", "course_id": 5},
        {"title": "Web Form Project", "description": "Create a contact form with validation", "course_id": 6},
    ]
    for assignment in assignments:
        db.add(models.Assignment(**assignment))
    db.commit()

    db.close()
    print("✅ Seeded: 7 courses, 3 lessons, 4 assignments.")

if __name__ == "__main__":
    seed_data()
