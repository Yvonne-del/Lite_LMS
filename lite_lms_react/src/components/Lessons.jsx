import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    if (!window.confirm("Are you sure you want to add this lesson?")) return;

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      if (video) {
        form.append('video', video);
      }

      const res = await fetch(`http://127.0.0.1:8000/courses/${id}/lessons`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
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

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={inputStyle}
        />
        <br />
        <textarea
          placeholder="Lesson Notes or Description"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          style={inputStyle}
        />
        <br />
        <input
          type="file"
          accept="video/mp4,video/webm"
          onChange={(e) => setVideo(e.target.files[0])}
          style={inputStyle}
        />
        <br />
        <button onClick={handleAddLesson} style={buttonStyle}>Add Lesson</button>
      </div>

      {lessons.length === 0 ? <p>No lessons yet.</p> : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} style={{ marginBottom: '15px' }}>
              <strong>{lesson.title}</strong>: {lesson.content}
              {lesson.video_url && (
                <div style={{ marginTop: '8px' }}>
                  <video width="320" height="180" controls>
                    <source src={lesson.video_url} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              <br />
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
  marginTop: '5px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Lessons;
