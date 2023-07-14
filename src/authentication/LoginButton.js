import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect();
  };

  if (isAuthenticated) {
    navigate("/app");
  } else {
    navigate("/");
  }

  return (
    <button style={{ border: "none", borderRadius: "5px" }} onClick={handleLogin}>
      Sign In
    </button>
  );
};

export default LoginButton;


