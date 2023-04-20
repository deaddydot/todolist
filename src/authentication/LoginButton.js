import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
  !isAuthenticated && (
     <button style={{border: 'none', borderRadius: '5px'}} onClick={() => loginWithRedirect()}> Sign In </button>
  )
  )
};

export default LoginButton;