const LoginButton = ({ isAuthenticated }) => { 
  const handleLoginClick = () => {
    window.location.href = 'http://localhost:5000/login';
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
