import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
     isAuthenticated && (
      <button style={{border: 'none', borderRadius: '5px'}} onClick={() => logout()}> 
        Sign Out 
      </button>
    )
  )
}

export default LogoutButton;