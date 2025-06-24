// LessonsPage.jsx / AssignmentsPage.jsx / StudentsPage.jsx
import { useParams } from 'react-router-dom';

const Lessons = () => {
  const { id } = useParams();
  return <h2>Lessons for Course {id}</h2>;
};

export default Lessons;
