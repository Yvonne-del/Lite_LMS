import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubmissionsPage = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/${assignmentId}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setSubmissions)
      .catch(console.error);
  }, [assignmentId]);

  const handleMarkReviewed = async (submissionId) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submissions/${submissionId}/review`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const updated = await res.json();
      setSubmissions(submissions.map(s => s.id === updated.id ? updated : s));
    }
  };

  return (
    <div>
      <h2>Submissions for Assignment {assignmentId}</h2>
      {submissions.map(sub => (
        <div key={sub.id} style={cardStyle}>
          <p><strong>File:</strong> <a href={`${import.meta.env.VITE_API_BASE_URL}/${sub.file_path}`} target="_blank">Download</a></p>
          <p><strong>Timestamp:</strong> {new Date(sub.timestamp).toLocaleString()}</p>
          <p><strong>Reviewed:</strong> {sub.reviewed ? "✅" : "❌"}</p>
          {!sub.reviewed && (
            <button onClick={() => handleMarkReviewed(sub.id)} style={btnStyle}>Mark as Reviewed</button>
          )}
        </div>
      ))}
    </div>
  );
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

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px'
};

export default SubmissionsPage;
