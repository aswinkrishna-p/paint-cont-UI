import React from 'react';
import ClientNav from '../Components/Client/ClientNav';

const NotFoundPage = () => {
 return (
  <>
  <ClientNav/>
    <div className=" min-h-screen">
      <div className="relative h-screen">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[767px] w-full leading-[1.4] text-center">
          <div className="relative h-[180px] mb-[20px] z-[-1]">
            <h1 className="font-[Montserrat,sans-serif] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[224px] font-[900] text-[#ff005a] uppercase shadow-[#8400ff -1px -1px,#ff005a 1px 1px] tracking-[-20px]">404</h1>
            <h2 className="font-[Montserrat,sans-serif] absolute left-0 right-0 top-[110px] text-[42px] font-[700] text-[#fff] uppercase shadow-[#8400ff 0px 2px] tracking-[13px]">Page not found</h2>
          </div>
          <a href="/user/home" className="font-[Montserrat,sans-serif] inline-block uppercase text-[#ff005a] no-underline border-2 border-transparent bg-transparent p-[10px 40px] text-[14px] font-[700] transition-all duration-200 hover:text-[#8400ff]">Homepage</a>
        </div>
      </div>
    </div>
  </>
 );
};

export default NotFoundPage;