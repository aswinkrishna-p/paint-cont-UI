
import React, { useState } from 'react';
// import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine ,RiLogoutCircleLine } from 'react-icons/ri'  // Importing profile and logout icons
import {
 Navbar,
 Typography,
//  IconButton,
 Button,
 Input,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { Logout, searchPainter } from '../../api/userApi';

function ClientNav(props) {

  const Navigate = useNavigate()
  const [searchQuery,setSearchQuery] = useState('') 

  const handleSearch =  async () => {
    try {
      const response = await searchPainter(searchQuery)
      // setPosts(response.data.filteredPosts )
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

        <div className="flex md:flex flex-wrap gap-4 sm:gap-14 md:mr-4 sm:mr-4">
          {/* Convert text into links */}
          <span onClick={() => Navigate('/')} className="text-white cursor-pointer">
            Home
          </span>
          <span onClick={() => Navigate('/chat')} className="text-white cursor-pointer">
            Chat
          </span>
          <span onClick={() => Navigate('/about')} className="text-white cursor-pointer">
            About Us
          </span>
          <span onClick={() => Navigate('/contact')} className="text-white cursor-pointer">
            Contact Us
          </span>

        </div>

        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label='Type here...'
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
          </div>

          {/* Adding profile and logout icons */}
          <div className="flex items-center gap-3">
          <span onClick={() => Navigate("/profile")} className="cursor-pointer">
          <RiUserLine className="text-lg" />
          </span>

            <button onClick={logout}>
              <RiLogoutCircleLine className="text-lg" />

            </button>
            
          </div>
      </div>
    </Navbar>
    );
}

export default ClientNav;