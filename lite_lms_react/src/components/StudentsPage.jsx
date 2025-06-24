// LessonsPage.jsx / AssignmentsPage.jsx / StudentsPage.jsx
import { useParams } from 'react-router-dom';

const StudentsPage = () => {
  const { id } = useParams();
  return <h2>Students for Course {id}</h2>;
};

export default StudentsPage;
