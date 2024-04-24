import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Users/Login';
import Register from './Pages/Users/Register';
import Home from './Pages/Users/Home';
import OtpPage from './Components/CommonComponents/otpPage';
import Profile from './Pages/Users/Profile';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDash from './Pages/Admin/AdminDash';
import AdminUserManagement from './Pages/Admin/AdminUserManagement';
import PainterProfile from './Pages/Painters/PainterProfile';

function App(props) {
  return (
    <>

   <BrowserRouter>
    <Routes>
      {/* adminRoutes */}
      <Route path='/adminlogin' element = {<AdminLogin/>} />
      <Route path='/dashboard' element = {<AdminDash/>} />
      <Route path='/user' element = {<AdminUserManagement/>} />

      {/* userRoutes */}
      <Route path='/' element = {<Home/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/otp' element = {<OtpPage/>} />
      <Route path='/profile' element = {<Profile/>} />

      {/* painterRoutes */}

      <Route path='painter/profile' element = {<PainterProfile/>} />
    </Routes>

   </BrowserRouter>
     
    </>
  );
}

export default App;
