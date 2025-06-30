import { Link, useNavigate } from 'react-router-dom';

const LecturerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img
          src="src/assets/download.png"
          alt="Lecturer"
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <h3>Lecturer</h3>
      </div>

      <div style={navLinksStyle}>
        <Link to="/dashboard" style={navLink}>📚 My Courses</Link>
        <Link to="/profile" style={navLink}>👤 Profile</Link>
        <button onClick={handleLogout} style={{ ...navLink, backgroundColor: 'red' }}>🚪 Logout</button>
      </div>
    </div>
  );
};

const sidebarStyle = {
  width: '220px',
  minHeight: '100vh',
  backgroundColor: '#f1f1f1',
  padding: '20px',
  boxSizing: 'border-box',
  borderRight: '1px solid #ccc'
};

const navLinksStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const navLink = {
  padding: '10px 15px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  border: 'none'
};

export default LecturerSidebar;
