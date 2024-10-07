import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

 const AdminProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');


  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        if (decode.role !== allowedRole) {
          navigate('/admin/login');
        }
       
      } else {
        navigate('/admin/login');
      }
    } catch (error) {
      navigate('/admin/login');
    }
  }, [token,navigate,allowedRole]); 

 
  return <>{children}</>;
};

export default AdminProtectedRoute;