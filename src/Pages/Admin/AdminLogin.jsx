import React, { useState ,useEffect} from "react";
import { useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../Redux/user/UserSlice";
import { adminLogin } from "../../api/adminApi";

function AdminLogin(props) {

  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      //if already logged in
      navigate('/dashboard')
    }
  }, [navigate])

  const handleSubmit = async (event) =>{

    event.preventDefault()

    try {
      dispatch(signInStart())

      const res = await adminLogin(username, password)
      console.log('userdataa ',res.data.token);

      dispatch(signInSuccess(res.data))

      localStorage.setItem('admin_token',res.data.token)

      if(res.status === 200){
        navigate('/dashboard')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      console.log(error.message);
    }
  }

  return (
    <>
    
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
            Hey Admin:
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  username  ? "text-sm -translate-y-4 scale-75" : ""
                }`}
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  password ? "text-sm -translate-y-4 scale-75" : ""
                }`}
              >
                Password
              </label>
            </div>
            <button type="submit" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;


