import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Lessons = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: '', content: '' });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/courses/${id}/lessons`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setLessons)
      .catch(console.error);
  }, [id]);

  const handleAddLesson = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/courses/${id}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newLesson)
      });

      if (res.ok) {
        const added = await res.json();
        setLessons([...lessons, added]);
        setNewLesson({ title: '', content: '' });
      }
    } catch (err) {
      console.error('Error adding lesson:', err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      }
    } catch (err) {
      console.error('Error deleting lesson:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lessons for Course {id}</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
          style={inputStyle}
        />
        <br />
        <textarea
          placeholder="Lesson Content or Link"
          value={newLesson.content}
          onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
          style={inputStyle}
        />
        <br />
        <button onClick={handleAddLesson} style={buttonStyle}>Add Lesson</button>
      </div>

      {lessons.length === 0 ? <p>No lessons found.</p> : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <strong>{lesson.title}</strong>: {lesson.content}
              <button onClick={() => handleDeleteLesson(lesson.id)} style={deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteButton = {
  marginLeft: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Lessons;
