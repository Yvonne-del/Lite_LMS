// LessonsPage.jsx / AssignmentsPage.jsx / StudentsPage.jsx
import { useParams } from 'react-router-dom';

const Assignments= () => {
  const { id } = useParams();
  return <h2>Assignments for Course {id}</h2>;
};

export default Assignments;
