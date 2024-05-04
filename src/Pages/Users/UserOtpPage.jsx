import React, { useState } from "react";


function UserOtpPage({email:initialEmail}) {
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
   
  return (
    <div className="flex justify-center items-center h-screen">
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
            {/* Use 4 input boxes for OTP entry */}
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                className="shadow appearance-none border rounded  w-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-5"
                type="text"
                id={`otp${index + 1}`}
                maxLength={1}
                value={otp[index]}
                onChange={handleOtpChange}
              />
            ))}
          </div>
        </div>

        <button className="submit text-white bg-[#3E45DF] rounded-lg py-2 px-3 font-semibold uppercase hover:bg-[#1c2294] transition duration-300">
          submit
        </button>
      </div>
    </div>
  );
}

export default UserOtpPage;
