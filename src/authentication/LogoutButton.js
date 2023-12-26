const LogoutButton = ({ isAuthenticated }) => {  
  const handleLogoutClick = () => {
    const logoutUrl = process.env.REACT_APP_BACKEND_URL 
                    ? process.env.REACT_APP_BACKEND_URL + '/logout' 
                    : 'http://localhost:5000/logout';
    window.location.href = logoutUrl;
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
