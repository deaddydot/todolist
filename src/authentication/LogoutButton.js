const LogoutButton = ({ isAuthenticated }) => {  
  const handleLogoutClick = () => {
    window.location.href = 'http://localhost:5000/logout';
  };

  return (
    isAuthenticated && (
      <button style={{border: 'none', borderRadius: '5px'}} onClick={handleLogoutClick}> 
        Sign Out 
      </button>
    )
  );
};

export default LogoutButton;
