import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description
  });

  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updated = await res.json();
        onUpdate(updated);
        setEditing(false);
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/courses/${course.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        onDelete(course.id);
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      width: '280px'
    }}>
      {editing ? (
        <>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ width: '100%', marginBottom: 5 }}
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', marginBottom: 5 }}
          />
          <button onClick={handleUpdate} style={btn}>Save</button>
          <button onClick={() => setEditing(false)} style={btn}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p><strong>Enrolled:</strong> {course.enrolled_students || 0}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Link to={`/dashboard/courses/${course.id}/lessons`} style={btn}>Lessons</Link>
            <Link to={`/dashboard/courses/${course.id}/assignments`} style={btn}>Assignments</Link>
            <Link to={`/dashboard/courses/${course.id}/students`} style={btn}>Students</Link>
            <button onClick={() => setEditing(true)} style={btn}>Edit</button>
            <button onClick={handleDelete} style={btn}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

const linkBtn = {
  backgroundColor: '#2196F3',
  color: 'white',
  padding: '6px',
  border: 'none',
  borderRadius: '4px',
  marginTop: '5px',
  textDecoration: 'none',
  cursor: 'pointer'
};

export default CourseCard;
