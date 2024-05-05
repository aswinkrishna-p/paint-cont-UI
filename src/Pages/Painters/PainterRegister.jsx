import React, { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import toast,{Toaster} from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'
import { signup } from '../../api/painterApi';
import { signInStart ,signInFailure ,signInSuccess  } from '../../Redux/user/UserSlice';
import { isValidEmail, isValidPassword, isValiduserName } from '../../services/validations';

function PainterRegister(props) {

  const [FormData , setFormData] = useState({})
  const dispatch =  useDispatch()
  const navigate = useNavigate()

//   useEffect(() => {
//     if (localStorage.getItem("user_token")) {
//       //if already logged in
//       navigate('/')
//     }
//   }, [navigate])

const handleSubmit = async (event) =>{

  try {
     event.preventDefault();

     if(FormData.password !== FormData.confirmpassword){
        return toast('Password mismatch', { icon: '⛔', });
     }

     const Tformdata ={
      ...FormData,
      username:FormData.username.trim(),
      email:FormData.email.trim(),
      password:FormData.password.trim(),
      confirmpassword:FormData.confirmpassword.trim()
     }

     if(!Tformdata.username || !Tformdata.email || !Tformdata.password){
      return toast.error("Missing required fields");
     }

     
     if(!isValiduserName(Tformdata.username)){
       
       return toast.error("Invalid userName");
      }
      
      if(!isValidPassword(Tformdata.password)){

        return toast.error("Password must be at least 6 characters long");
      }
    
    if(!isValidEmail(Tformdata.email)){

      return toast.error("Invalid email format");
    }

    dispatch(signInStart())
    let res = await signup(Tformdata)
    // console.log('resssssss' ,res);
    dispatch(signInSuccess(res.data))
    
    if(res.status === 200){
      toast.success('Signup successful \n Please Login to continue')
      setTimeout(() => {
        
        navigate('/painter/otp',{state:{email:FormData.email}})
      }, 2000);
    }else{
      toast.error('user already exists')
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
          <Toaster/>
      <div className="flex flex-col items-center gap-4 w-96 h-auto  bg-[#0D0E26] rounded-md">
        <div>
          <h1 className="text-white uppercase mt-7 font-semibold text-3xl ">Create Account</h1>
        </div>
        <form className="flex flex-col gap-6 py-4 px-14" onSubmit={(event) => handleSubmit(event)} >
          <input
            type="text"
            name="username"
            id='username'
            placeholder="username"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id='email'
            placeholder="email address"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id='password'
            placeholder="password"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmpassword"
            id='confirmpassword'
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

export default PainterRegister;