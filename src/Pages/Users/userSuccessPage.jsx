import React from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import { Link } from 'react-router-dom';

function UserSuccessPage() {
  return (
    <>
      <div>
        <ClientNav />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="border p-6 rounded-lg shadow-lg text-center animate-fadeIn">
          <svg
            className="w-20 h-20 mx-auto mb-4 text-green-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h2>
          <p className="text-white mb-4">
            Thank you for your payment. Your transaction has been completed.
          </p>
          <Link
            to="/"
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserSuccessPage;
