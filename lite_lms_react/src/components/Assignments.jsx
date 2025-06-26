import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LecturerLayout from './LecturerLayout';

const Assignments= () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', due_date: '' });

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
    if (!window.confirm("Add this assignment?")) return;

    const res = await fetch(`http://127.0.0.1:8000/courses/${id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const added = await res.json();
      setAssignments([...assignments, added]);
      setFormData({ title: '', description: '', due_date: '' });
    }
  };

  const handleDelete = async (assignmentId) => {
    if (!window.confirm("Delete this assignment?")) return;

    const res = await fetch(`http://127.0.0.1:8000/assignments/${assignmentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };

  const handleSave = async (assignment) => {
    const res = await fetch(`http://127.0.0.1:8000/assignments/${assignment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(assignment)
    });

    if (res.ok) {
      const updated = await res.json();
      setAssignments(assignments.map(a => a.id === updated.id ? updated : a));
    }
  };

  return (
    <LecturerLayout>
      <h2>Assignments for Course {id}</h2>

      <input
        type="text"
        placeholder="Assignment Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={inputStyle}
      />
      <textarea
        placeholder="Assignment Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        style={inputStyle}
      />
      <input
        type="date"
        value={formData.due_date}
        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
        style={inputStyle}
      />
      <button onClick={handleAddAssignment} style={btnStyle}>Add Assignment</button>

      <hr />

      {assignments.map((a) => (
        <div key={a.id} style={cardStyle}>
          <input
            type="text"
            value={a.title}
            onChange={(e) =>
              setAssignments(assignments.map(item => item.id === a.id ? { ...item, title: e.target.value } : item))
            }
            style={inputStyle}
          />
          <textarea
            value={a.description}
            onChange={(e) =>
              setAssignments(assignments.map(item => item.id === a.id ? { ...item, description: e.target.value } : item))
            }
            style={inputStyle}
          />
          <input
            type="date"
            value={a.due_date}
            onChange={(e) =>
              setAssignments(assignments.map(item => item.id === a.id ? { ...item, due_date: e.target.value } : item))
            }
            style={inputStyle}
          />
          <button onClick={() => handleSave(a)} style={btnStyle}>Save</button>
          <button onClick={() => handleDelete(a.id)} style={deleteBtn}>Delete</button>
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
  backgroundColor: '#007bff',
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

export default Assignments;
