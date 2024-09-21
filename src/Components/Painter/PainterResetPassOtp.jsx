import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resendOTP, resentOtpVerification } from "../../api/painterApi";

function PainterResetPassOtp(props) {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [otpSent , setOtpSent] = useState(false)
    const Navigate = useNavigate()
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleOtpChange = (event) => {
      setOtp(event.target.value);
    };
  
    const handleSubmit = async (event) =>{
    
      console.log('inside handle submit');
      
      let verify = await resentOtpVerification(email ,otp)
  
      if(verify.data.success){
        setTimeout(() => {
          toast.success('Otp verification successful \n Please create a new password to continue')
          Navigate('/painter/newpass',{state:{email:email}})
        }, 2000);
      }else{
        toast.error('error in otp verification')
      }
    }
  
    const handleResendOTP = async () =>{
      console.log('inside resend otp front end');
      try {

        if(!email){
          return toast.error('enter your email')
        }
        const res = await resendOTP(email)
  
        if(res.data.success){
          console.log('resended otp');
          setOtpSent(true)
          setTimer(30)
          setResendDisabled(false)
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      let timerInterval;
      if (timer > 0) {
        timerInterval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 1) {
              setResendDisabled(false); 
              clearInterval(timerInterval); 
            }
            return prevTimer - 1;
          });
        }, 1000);
      }
  
      return () => clearInterval(timerInterval);
    }, [timer]);

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
          <button
            onClick={handleSubmit}
            className="submit text-white bg-[#3E45DF] rounded-lg py-2 px-3 font-semibold uppercase hover:bg-[#1c2294] transition duration-300"
          >
            Submit OTP
          </button>
          {!otpSent ? (
            // Initially show "Send OTP"
            <button
              onClick={handleResendOTP}
              className="submit text-white bg-orange-900 rounded-lg py-2 px-3 font-semibold uppercase hover:bg-orange-800 transition duration-300"
              
            >
              Send OTP
            </button>
          ) : timer > 0 ? (
            // Show timer if OTP is already sent
            <span className="text-white opacity-90 text-sm">
              Resend OTP in {timer} seconds
            </span>
          ) : (
            // Show "Resend OTP" once timer finishes
            <button
              onClick={handleResendOTP}
              className="submit text-white bg-orange-900 rounded-lg py-2 px-3 font-semibold uppercase hover:bg-orange-800 transition duration-300"
              disabled={resendDisabled}
            >
              Resend OTP
            </button>
          )}
        </div>
         </div>
      </div>
    );
}

export default PainterResetPassOtp;