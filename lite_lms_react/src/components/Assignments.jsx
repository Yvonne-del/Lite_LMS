import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Assignments = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: ''
  });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/courses/${id}/assignments`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setAssignments)
      .catch(console.error);
  }, [id]);

  const handleAddAssignment = async () => {
    if (!window.confirm("Are you sure you want to add this assignment?")) return;

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('due_date', formData.due_date);
      if (file) {
        form.append('file', file);
      }

      const res = await fetch(`http://127.0.0.1:8000/courses/${id}/assignments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      });

      if (res.ok) {
        const added = await res.json();
        setAssignments([...assignments, added]);
        setFormData({ title: '', description: '', due_date: '' });
        setFile(null);
      }
    } catch (err) {
      console.error('Error adding assignment:', err);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/assignments/${assignmentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setAssignments(assignments.filter(a => a.id !== assignmentId));
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assignments for Course {id}</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={inputStyle}
        />
        <br />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={inputStyle}
        />
        <br />
        <input
          type="date"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          style={inputStyle}
        />
        <br />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.pptx,.zip"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
        />
        <br />
        <button onClick={handleAddAssignment} style={buttonStyle}>Add Assignment</button>
      </div>

      {assignments.length === 0 ? <p>No assignments yet.</p> : (
        <ul>
          {assignments.map((a) => (
            <li key={a.id}>
              <strong>{a.title}</strong> – {a.description} (Due: {a.due_date})
              {a.file_url && (
                <>
                  {' '}<a href={a.file_url} target="_blank" rel="noreferrer">[Download]</a>
                </>
              )}
              <button onClick={() => handleDeleteAssignment(a.id)} style={deleteButton}>Delete</button>
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

export default Assignments;
