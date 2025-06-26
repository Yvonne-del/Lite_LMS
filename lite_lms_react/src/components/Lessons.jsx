import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LecturerLayout from './LecturerLayout';

const Lessons = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [video, setVideo] = useState(null);

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
    if (!window.confirm("Add this lesson?")) return;

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      if (video) form.append('video', video);

      const res = await fetch(`http://127.0.0.1:8000/courses/${id}/lessons`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });

      if (res.ok) {
        const added = await res.json();
        setLessons([...lessons, added]);
        setFormData({ title: '', content: '' });
        setVideo(null);
      }
    } catch (err) {
      console.error('Error adding lesson:', err);
    }
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLessons(lessons.filter(l => l.id !== lessonId));
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleSave = async (lesson) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/lessons/${lesson.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(lesson)
      });
      if (res.ok) {
        const updated = await res.json();
        setLessons(lessons.map(l => l.id === updated.id ? updated : l));
      }
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <LecturerLayout>
      <h2>Lessons for Course {id}</h2>

      <input
        type="text"
        placeholder="Lesson Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={inputStyle}
      />
      <textarea
        placeholder="Lesson Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        style={inputStyle}
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        style={inputStyle}
      />
      <button onClick={handleAddLesson} style={btnStyle}>Add Lesson</button>

      <hr />

      {lessons.map((lesson) => (
        <div key={lesson.id} style={cardStyle}>
          <input
            type="text"
            value={lesson.title}
            onChange={(e) =>
              setLessons(lessons.map(l => l.id === lesson.id ? { ...l, title: e.target.value } : l))
            }
            style={inputStyle}
          />
          <textarea
            value={lesson.content}
            onChange={(e) =>
              setLessons(lessons.map(l => l.id === lesson.id ? { ...l, content: e.target.value } : l))
            }
            style={inputStyle}
          />
          {lesson.video_url && (
            <video width="320" controls>
              <source src={lesson.video_url} />
            </video>
          )}
          <br />
          <button onClick={() => handleSave(lesson)} style={btnStyle}>Save</button>
          <button onClick={() => handleDelete(lesson.id)} style={deleteBtn}>Delete</button>
        </div>
      ))}
    </LecturerLayout>
  );
};

const inputStyle = {
  width: '100%',
  margin: '5px 0',
  padding: '8px'
};

const btnStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '6px 12px',
  border: 'none',
  marginTop: '10px',
  cursor: 'pointer',
  borderRadius: '4px'
};

const deleteBtn = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '6px 12px',
  border: 'none',
  marginLeft: '10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '10px',
  marginTop: '15px'
};

export default Lessons;
