import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

 const PainterProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('painter_token');


  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        if (decode.role !== allowedRole) {
          navigate('/painter/login');
        }
        
      } else {
        navigate('/painter/login');
      }
    } catch (error) {
      navigate('/painter/login');
    }
  }, [token,navigate,allowedRole]); 

 
  return <>{children}</>;
};

export default PainterProtectedRoute;