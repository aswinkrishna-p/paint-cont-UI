import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Users/Login';
import Register from './Pages/Users/Register';
import Home from './Pages/Users/Home';
import Profile from './Pages/Users/Profile';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDash from './Pages/Admin/AdminDash';
import AdminUserManagement from './Pages/Admin/AdminUserManagement';
import PainterProfile from './Pages/Painters/PainterProfile';
import PainterRegister from './Pages/Painters/PainterRegister';
import PainterLogin from './Pages/Painters/PainterLogin';
import PainterOtpPage from './Pages/Painters/PainterOtpPage';
import ClientPainterProfile from './Pages/Users/UserPainterProfile';
import UserOtpPage from './Pages/Users/UserOtpPage';

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
      <Route path='/otp' element = {<UserOtpPage/>} />
      <Route path='/profile' element = {<Profile/>} />
      <Route path='/painterprofile' element = {<ClientPainterProfile/>} />

      {/* painterRoutes */}

      <Route path='painter/register' element = {<PainterRegister/>} />
      <Route path='painter/login' element = {<PainterLogin/>} />
      <Route path='painter/otp' element = {<PainterOtpPage/>} />
      <Route path='painter/profile' element = {<PainterProfile/>} />
    </Routes>

   </BrowserRouter>
     
    </>
  );
}

export default App;
