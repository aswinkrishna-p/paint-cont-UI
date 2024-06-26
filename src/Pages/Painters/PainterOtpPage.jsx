import React, { useEffect, useState } from "react";
import { otpVerification, resendOTP } from "../../api/painterApi";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from 'react-hot-toast'


function PainterOtpPage({email:initialEmail}) {
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const Navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) =>{
  
    
    let verify = await otpVerification(email ,otp)

    if(verify.status === 200){
      toast.success('Signup successful \n Please Login to continue')
      Navigate('/painter/login')
    }else{
      toast.error('user already exists')
    }
  }

  const handleResendOTP = async () =>{
    console.log('inside resend otp front end');
    try {
      const res = await resendOTP(email)

      if(res.success){
        console.log('resended otp');
        setTimer(30)
        setResendDisabled(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    const timerInterval = setInterval(() =>{
      setTimer((prevTimer) =>{
        if(prevTimer === 1){
          setResendDisabled(true)
          clearInterval(timerInterval)
        }
        return prevTimer -1;
      })
    },1000)
    return () => clearInterval(timerInterval)
  },[timer])
   
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster/>
      <div className="bg-[#0D0E26] shadow-md rounded px-5 pt-5 pb-5 mb-4 ">
        <h2 className="text-2xl text-white font-bold mb-4">
          Enter Email and OTP
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            OTP:
          </label>
          <div className="flex">
          <input
            className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter your OTP"
          />
          </div>
        </div>
        <div className="flex flex-row justify-between">
        <button onClick={handleSubmit} className="submit text-white bg-[#3E45DF] rounded-lg py-2 px-3 font-semibold uppercase hover:bg-[#1c2294] transition duration-300">
          submit otp
        </button>
        {timer > 0 ? (
          <span className="text-white opcity-10  text-sm">Resend OTP in {timer} seconds </span>
        ):(
          <button onClick={handleResendOTP} className="submit text-white bg-orange-900 rounded-lg py-2 px-3 font-semibold uppercase hover:bg-deep-orange-900 transition duration-300">
          Resent otp
        </button>

        )}
        </div>
       </div>
    </div>
  );
}

export default PainterOtpPage;
