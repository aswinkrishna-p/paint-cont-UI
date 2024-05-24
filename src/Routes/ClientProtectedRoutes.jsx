import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

 const ClientProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('user_token');

  console.log(token,"oooooooooooooooooooooooo");

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        if (decode.role !== allowedRole) {
          navigate('/login');
        }
        // No need for an else block, you can proceed with the rendering logic
      } else {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  }, [token,navigate,allowedRole]); // Dependency array is empty to run the effect only once

  // Render the content based on conditions
  return <>{children}</>;
};

export default ClientProtectedRoute;