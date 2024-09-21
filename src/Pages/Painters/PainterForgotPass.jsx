import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"; 
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidPassword } from "../../services/validations";
import { resetPassword } from "../../api/painterApi";

function PainterForgotPass(props) {

    const location = useLocation(); // Get the location object
    const useremail = location.state?.email || ''; 
  
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showNewPass, setShowNewPass] = useState(false); 
    const [showConfirmPass, setShowConfirmPass] = useState(false); 
    const [email ,setEmail] = useState(useremail || '')
    const Navigate = useNavigate();
  
   console.log(email,'email in passs');
   
    const handleSubmit = async (event) => {
  
      event.preventDefault()
  
      try {
          
          if(!isValidPassword(newPass)){
              return toast.error('not a valid password')
          }
  
          if(newPass !== confirmPass){
              return toast.error('password not matching')
          }
  
          const result = await resetPassword(email, newPass)
  
          if(result.data.success) Navigate('/painter/login')
  
          console.log(result);
          
      } catch (error) {
          console.log(error);
          
      }
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster />
        <div className="bg-[#0D0E26] shadow-md rounded px-5 pt-5 pb-5 mb-4">
          <h2 className="text-2xl text-white font-bold mb-4">
            Create new password
          </h2>
  
          
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="new-password"
            >
              New password:
            </label>
            <input
              className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new-password"
              type={showNewPass ? "text" : "password"} 
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              {showNewPass ? (
                <RiEyeOffLine className="text-gray-500" /> 
              ) : (
                <RiEyeLine className="text-gray-500" /> 
              )}
            </span>
          </div>
  
     
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm password:
            </label>
            <input
              className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type={showConfirmPass ? "text" : "password"} 
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm password"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? (
                <RiEyeOffLine className="text-gray-500" />
              ) : (
                <RiEyeLine className="text-gray-500" /> 
              )}
            </span>
          </div>
  
          <div className="flex flex-row justify-center">
            <button
              onClick={handleSubmit}
              className="submit text-white bg-deep-orange-800 rounded-lg py-2 px-3 font-semibold uppercase hover:bg-[#1c2294] transition duration-300"
            >
              Save password
            </button>
          </div>
        </div>
      </div>
    );
}

export default PainterForgotPass;