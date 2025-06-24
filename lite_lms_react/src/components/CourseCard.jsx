import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      width: '280px'
    }}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p><strong>Enrolled:</strong> {course.enrolled_students || 0}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
        <Link to={`/dashboard/courses/${course.id}/lessons`} style={linkBtn}>Lessons</Link>
        <Link to={`/dashboard/courses/${course.id}/assignments`} style={linkBtn}>Assignments</Link>
        <Link to={`/dashboard/courses/${course.id}/students`} style={linkBtn}>Students</Link>
      </div>
    </div>
  );
};

const linkBtn = {
  padding: '6px',
  backgroundColor: '#2196F3',
  color: 'white',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '4px'
};

export default CourseCard;
