import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentsPage = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/courses/${id}/students`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setStudents)
      .catch(console.error);
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enrolled Students for Course {id}</h2>
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} – {student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentsPage;
