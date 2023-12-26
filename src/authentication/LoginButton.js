const LoginButton = ({ isAuthenticated }) => { 
  const handleLoginClick = () => {
    const loginUrl = process.env.REACT_APP_BACKEND_URL 
                    ? process.env.REACT_APP_BACKEND_URL + '/login' 
                    : 'http://localhost:5000/login';
    window.location.href = loginUrl;
  };

  return (
    !isAuthenticated && (
      <button style={{border: 'none', borderRadius: '5px'}} onClick={handleLoginClick}> 
        Sign In 
      </button>
    )
  );
};

export default LoginButton;
