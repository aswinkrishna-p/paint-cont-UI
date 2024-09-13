import React from 'react';
import { RiCloseLine, RiUserLine, RiLogoutCircleLine } from 'react-icons/ri'; // Import icons

function Sidebar({ isOpen, toggleSidebar, Navigate, logout }) {
  return (
    <div
      className={`fixed top-0 right-0 w-[250px] h-full bg-black z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-end p-4">
        <RiCloseLine
          className="text-white text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex flex-col items-start pl-6 space-y-6">
        <span
          onClick={() => {
            toggleSidebar();
            Navigate('/');
          }}
          className="text-white cursor-pointer"
        >
          Home
        </span>
        <span
          onClick={() => {
            toggleSidebar();
            Navigate('/chat');
          }}
          className="text-white cursor-pointer"
        >
          Chat
        </span>
        <span
          onClick={() => {
            toggleSidebar();
            Navigate('/about');
          }}
          className="text-white cursor-pointer"
        >
          About Us
        </span>
        <span
          onClick={() => {
            toggleSidebar();
            Navigate('/contact');
          }}
          className="text-white cursor-pointer"
        >
          Contact Us
        </span>
        
        {/* Add profile and logout buttons in the sidebar */}
        <span
          onClick={() => {
            toggleSidebar();
            Navigate('/profile');
          }}
          className="text-white cursor-pointer flex items-center gap-2"
        >
          <RiUserLine className="text-lg" /> Profile
        </span>

        <span
          onClick={() => {
            toggleSidebar();
            logout(); // Call the logout function
          }}
          className="text-white cursor-pointer flex items-center gap-2"
        >
          <RiLogoutCircleLine className="text-lg" /> Logout
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
