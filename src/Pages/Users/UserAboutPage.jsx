import React from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import pfImage from '../../Assets/paint-roller1.gif'
import { Link } from 'react-router-dom';

function ClientAboutPage() {
  return (
    <>
        <ClientNav />
      <div className=" flex justify-center items-center h-[45rem] ">
        <div className="bg-[#0D0E26] sm:w-[1000px] sm:h-[500px] w-[400px] h-[650px]  border rounded-[70px] p-6">
          <div className="sm:flex sm:justify-between xl:flex xl:justify-center items-center h-full ">
            <div className="sm:flex-shrink-0 flex justify-center ">
              <img src={pfImage} alt="Headline" className="w-[300px] h-[300px] rounded-[25px]" />
            </div>
            <div className="text-white flex-grow ml-6">
              <h1 className="text-3xl font-bold mb-4">About Us</h1>
              <p className="text-lg">
                Welcome to our page! We are dedicated to providing the best services in wall painting. Our team of experts ensures top-notch quality and customer satisfaction. Get to know more about our journey and the values that drive us.
              </p>
              <button className='bg-white text-black rounded-[20px] w-40 h-10 mt-5'>
                <Link to="/user/contact">
                Connecting with us
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientAboutPage;