import React from 'react';
import AdminNav from '../../Components/Admin/AdminNav';

function AdminUserManagement(props) {
    return (
        <div className=" flex">
        <AdminNav/>
      <div className="flex justify-center items-center w-full bg-white h-screen">
        <div>admin user</div>
      </div>
      </div>
    );
}

export default AdminUserManagement;