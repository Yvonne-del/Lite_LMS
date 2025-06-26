import LecturerSidebar from './LecturerSidebar';

const LecturerLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <LecturerSidebar />
      <div style={{ flex: 1, padding: '30px' }}>
        {children}
      </div>
    </div>
  );
};

export default LecturerLayout;
