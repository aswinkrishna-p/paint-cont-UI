import React, { useState ,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import ClientNav from "../../Components/Client/ClientNav";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../Redux/user/UserSlice";
import { login } from "../../api/userApi";

function Login(props) {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      //if already logged in
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (event) =>{

    event.preventDefault()

    try {
      dispatch(signInStart())

      const res = await login(email, password)

      dispatch(signInSuccess(res.data))

      if(res.status === 200){
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      console.log(error.message);
    }
  }

  return (
    <>
      <ClientNav/>
    <div className=" w-screen h-screen flex flex-col justify-center  items-center bg-cover bg-center ">
      <div className="flex flex-col items-center gap-4 w-96 bg-black rounded-lg">
        <div>
          <h1 className="text-white uppercase mt-7 font-semibold text-3xl "> sign in</h1>
        </div>
        <form className="flex flex-col gap-6 py-4 px-14" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            
            placeholder="enter your email address"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            
            placeholder="enter your email address"
            className="block bg-[white] w-72 px-4 py-2 mt-2   border rounded-md "
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" text-white bg-[#3E45DF] rounded-2xl py-2 px-4 uppercase font-bold hover:bg-[#1c2294] transition duration-300 ">Create Account</button>
          <button className=" text-white bg-[#BF0000] rounded-2xl py-2 px-4  font-bold hover:bg-[#bf0000c6] transition duration-300 "> Sign up with google</button>
        </form>
          <span className="text-white uppercase mb-3 text-center">Don't have an account? <Link to= '/register' className="font-bold text-blue-700" >Register</Link> </span>
      </div>
    </div>
    </>
  );
}

export default Login;
