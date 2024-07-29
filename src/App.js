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
import AdminPainterManagement from './Pages/Admin/AdminPainterManagement';
import ClientProtectedRoute from './Routes/ClientProtectedRoutes';
import PainterProtectedRoute from './Routes/PainterProtectedRoutes';
import PainterSlotAdd from './Pages/Painters/PainterSlotAdd';
import Messages from './Pages/CommonPages/Messages';
import UserSuccessPage from './Pages/Users/userSuccessPage';
import MessagesPainter from './Pages/CommonPages/MessagesPainter';
import AdminPostManagement from './Pages/Admin/AdminPostManagement';
import ClientAboutPage from './Pages/Users/UserAboutPage';

function App(props) {
  return (
    <>

   <BrowserRouter>
    <Routes>
      {/* adminRoutes */}
      <Route path='/adminlogin' element = {<AdminLogin/>} />
      <Route path='/dashboard' element = {<AdminDash/>} />
      <Route path='/user' element = {<AdminUserManagement/>} />
      <Route path='/painter' element = {<AdminPainterManagement/>} />
      <Route path='/posts' element = {<AdminPostManagement/>} />

      {/* userRoutes */}
      <Route path='/' element = {<Home/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/otp' element = {<UserOtpPage/>} />
      <Route path='/chat' element = {<Messages/>} />
      <Route path='/chat/:id' element = {<Messages/>} />
      <Route path='/about' element = {<ClientProtectedRoute allowedRole={'user'}> <ClientAboutPage/> </ClientProtectedRoute> } />
      <Route path='/profile' element = {<ClientProtectedRoute allowedRole={'user'}> <Profile/> </ClientProtectedRoute> } />
      <Route path='/painterprofile/:id' element = {<ClientProtectedRoute allowedRole={'user'}> <ClientPainterProfile/> </ClientProtectedRoute>} />
      <Route path='/payment-success' element = {<ClientProtectedRoute allowedRole={'user'}> <UserSuccessPage/> </ClientProtectedRoute>} />

      {/* painterRoutes */}

      <Route path='painter/register' element = {<PainterRegister/>} />
      <Route path='painter/login' element = {<PainterLogin/>} />
      <Route path='painter/otp' element = {<PainterOtpPage/>} />
      <Route path='painter/profile' element = {<PainterProtectedRoute allowedRole={'painter'}> <PainterProfile/> </PainterProtectedRoute>} />
      <Route path='painter/chat' element = {<PainterProtectedRoute allowedRole={'painter'}> <MessagesPainter/> </PainterProtectedRoute>} />
      <Route path='painter/slot' element = {<PainterSlotAdd/>} />
    </Routes>

   </BrowserRouter>
     
    </>
  );
}

export default App;
