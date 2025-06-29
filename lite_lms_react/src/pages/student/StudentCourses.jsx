import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../components/StudentLayout'; // adjust path if needed

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("userId"); // store it on login

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/students/${studentId}/courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <StudentLayout>
      <h2>My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <ul style={listStyle}>
          {courses.map(course => (
            <li key={course.id} style={cardStyle}>
              <h3>{course.name} ({course.code})</h3>
              <p>Semester: {course.semester}</p>
              <p>Instructor: {course.teacher?.name || 'TBA'}</p>
              <Link to={`/student/courses/${course.id}/lessons`} style={btnStyle}>View Lessons</Link>
              <Link to={`/student/courses/${course.id}/assignments`} style={{ ...btnStyle, marginLeft: '10px' }}>View Assignments</Link>
            </li>
          ))}
        </ul>
      )}
    </StudentLayout>
  );
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
};

const btnStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '6px 12px',
  textDecoration: 'none',
  borderRadius: '4px'
};

export default StudentCourses;
