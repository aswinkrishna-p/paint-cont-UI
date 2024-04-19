import React, { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { signup } from '../../api/userApi';
import { signInStart ,signInFailure ,signInSuccess  } from '../../Redux/user/UserSlice';

function Register(props) {

  const [FormData , setFormData] = useState({})
  const dispatch =  useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      //if already logged in
      navigate('/')
    }
  }, [navigate])

const handleSubmit = async (event) =>{

  event.preventDefault();
  
   try {

    dispatch(signInStart())
    const Registerdata = FormData
    let res = await signup(Registerdata)

    dispatch(signInSuccess(res.data))
    
    if(res.status===200){
      navigate('/login')
    }
   } catch (error) {
    dispatch(signInFailure(error.message))
    console.log(error.message);
   }
}

const handleChange =(event) =>{
  setFormData({...FormData, [event.target.name]: event.target.value})
  
}  


    return (
        <div className=" w-screen h-screen flex flex-col justify-center items-center bg-cover bg-center ">
      <div className="flex flex-col items-center gap-4 w-96 h-auto  bg-black rounded-md">
        <div>
          <h1 className="text-white uppercase mt-7 font-semibold text-3xl ">Create Account</h1>
        </div>
        <form className="flex flex-col gap-6 py-4 px-14" onSubmit={(event) => handleSubmit(event)} >
          <input
            type="text"
            name="username"
            placeholder="username"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email address"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="confirm password "
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />

          <button type='submit' className=" text-white bg-[#3E45DF] rounded-2xl py-2 px-4 font-bold hover:bg-[#1c2294] transition duration-300 ">Create Account</button>
          <button className=" text-white bg-[#3E45DF] rounded-2xl py-2 px-4 font-bold hover:bg-[#1c2294] transition duration-300 ">Create Account</button>
          <span className="text-white uppercase text-center">Already have an account? <Link to= '/login' className="font-bold text-blue-700" >Login</Link> </span>
        </form>
      </div>
    </div> 
    );
}

export default Register;