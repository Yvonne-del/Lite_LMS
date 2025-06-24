import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{course.title}</h3>
      <p style={{ marginBottom: '10px', color: '#555' }}>{course.description}</p>
      <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        Enrolled Students: {course.enrolledStudents}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={buttonStyle}>View Lessons</button>
        <button style={buttonStyle}>View Assignments</button>
        <button style={buttonStyle}>View Students</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '6px 10px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '12px',
  cursor: 'pointer'
};

export default CourseCard;
