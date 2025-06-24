import React from 'react';
import CourseCard from './CourseCard';

const mockCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React for frontend development.',
    enrolledStudents: 24,
  },
  {
    id: 2,
    title: 'Advanced Python',
    description: 'Deep dive into Python for data and web apps.',
    enrolledStudents: 15,
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    description: 'Core CS concepts for building efficient software.',
    enrolledStudents: 30,
  },
];

const LecturerDashboard = () => {
  const lecturerName = "Yvonne";

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
        Welcome, {lecturerName}
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <button style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          + Create New Course
        </button>
      </div>

      <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>My Courses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        {mockCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default LecturerDashboard;
