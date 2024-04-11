import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Users/Login';
import Register from './Pages/Users/Register';
import Home from './Pages/Users/Home';

function App(props) {
  return (
    <>

   <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/login' element = {<Login/>} />
    </Routes>

   </BrowserRouter>
     
    </>
  );
}

export default App;
