import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const LecturerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch('http://127.0.0.1:8000/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submit
  const handleCreateCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch('http://127.0.0.1:8000/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCourse)
      });

      if (res.ok) {
        const added = await res.json();
        setCourses([...courses, added]);
        setNewCourse({ title: '', description: '' });
        setFormVisible(false);
      }
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, Lecturer</h1>

      <button onClick={() => setFormVisible(!formVisible)} style={btnStyle}>
        {formVisible ? 'Cancel' : '+ Create Course'}
      </button>

      {formVisible && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            style={inputStyle}
          />
          <br />
          <textarea
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            style={inputStyle}
          />
          <br />
          <button onClick={handleCreateCourse} style={btnStyle}>Submit</button>
        </div>
      )}

      <h2>My Courses</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const inputStyle = {
  padding: '8px',
  margin: '5px 0',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default LecturerDashboard;
