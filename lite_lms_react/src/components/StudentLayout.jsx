import { Link } from 'react-router-dom';

const StudentLayout = ({ children }) => {
  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <h2>🎓 Student Dashboard</h2>
        <ul style={ulStyle}>
          <li><Link to="/student/courses" style={linkStyle}>My Courses</Link></li>
          <li><Link to="/student/submissions" style={linkStyle}>My Submissions</Link></li>
          <li><Link to="/" style={linkStyle}>Logout</Link></li>
        </ul>
      </nav>
      <main style={mainStyle}>{children}</main>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const navStyle = {
  width: '220px',
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '20px',
};

const ulStyle = {
  listStyleType: 'none',
  padding: 0,
  marginTop: '20px'
};

const linkStyle = {
  display: 'block',
  color: 'white',
  textDecoration: 'none',
  margin: '10px 0',
};

const mainStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#f8fafc',
};

export default StudentLayout;
