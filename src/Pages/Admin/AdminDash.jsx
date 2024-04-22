import React ,{useEffect}from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { useNavigate } from "react-router-dom";

function AdminDash(props) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      //if already logged in
      navigate('/adminlogin')
    }
  }, [navigate])
  return (
    <div className=" flex">
        <AdminNav/>
      <div className="flex justify-center items-center w-full bg-white h-screen">
        <div>admin dashboard</div>
      </div>
      </div>
  );
}

export default AdminDash;
