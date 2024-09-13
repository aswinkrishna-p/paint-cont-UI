
import React, { useState } from 'react';
// import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine ,RiLogoutCircleLine ,RiMenuLine} from 'react-icons/ri'  // Importing profile and logout icons
import {
 Navbar,
 Typography,
//  IconButton,
 Button,
 Input,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { Logout, searchPainter } from '../../api/userApi';
import Sidebar from '../CommonComponents/SideBar/Sidebar';

function ClientNav(props) {

  const Navigate = useNavigate()
  const [searchQuery,setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch =  async () => {
    try {
      const response = await searchPainter(searchQuery)
        setSearchResults(response.data.data)
      setSearchQuery('')
    } catch (error) {
      console.log(error);
    }
  }


  const logout =async () =>{
    let res = await Logout()

    if(res.status === 200){
      localStorage.clear('user_token')
      Navigate('/login')
    }
  }


    return (
      <div>
      <Navbar
        variant="gradient"
        color=""
        className=" mx-auto max-w-full w-full px-4 py-3 rounded-none h-[60px] fixed z-50 bg-black"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Paintcont
          </Typography>

          <RiMenuLine
              className="text-2xl cursor-pointer md:hidden"
              onClick={toggleSidebar}
            />

          <div className="hidden md:flex md:flex-wrap gap-4 sm:gap-14 md:mr-4 sm:mr-4">
            {/* Convert text into links */}
            <span
              onClick={() => Navigate("/")}
              className="text-white cursor-pointer"
            >
              Home
            </span>
            <span
              onClick={() => Navigate("/chat")}
              className="text-white cursor-pointer"
            >
              Chat
            </span>
            <span
              onClick={() => Navigate("/about")}
              className="text-white cursor-pointer"
            >
              About Us
            </span>
            <span
              onClick={() => Navigate("/contact")}
              className="text-white cursor-pointer"
            >
              Contact Us
            </span>
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Type here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-transparent border-b border-white focus:outline-none"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
              onClick={handleSearch}
            >
              Search
            </Button>
            {searchResults.length > 0 && (
              <div className="absolute top-[60px] w-full bg-white text-black p-2 rounded shadow-md">
                {searchResults.map((painter) => (
                  <div
                    key={painter._id}
                    className="p-2 border-b cursor-pointer border-gray-300" onClick={() => Navigate(`/painterprofile/${painter._id}`)}
                  >
                    
                    {painter.username}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Adding profile and logout icons */}
          <div className=" hidden md:flex items-center gap-3">
            <span
              onClick={() => Navigate("/profile")}
              className="cursor-pointer"
            >
              <RiUserLine className="text-lg" />
            </span>

            <button onClick={logout}>
              <RiLogoutCircleLine className="text-lg" />
            </button>
          </div>
        </div>
      </Navbar>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} Navigate={Navigate} logout={logout} />
      </div>
    );
}

export default ClientNav;