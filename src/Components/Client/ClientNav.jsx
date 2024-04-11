
import React from 'react';
// import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine ,RiLogoutCircleLine } from 'react-icons/ri'  // Importing profile and logout icons
import {
 Navbar,
 Typography,
//  IconButton,
//  Button,
 Input,
} from "@material-tailwind/react";

function ClientNav(props) {
    return (
        <Navbar
      variant="gradient"
      color="blue-gray"
      className=" mx-auto w-full px-4 py-3 h-[60px] fixed z-50 bg-gradient-to-r from-purple-900 to-blue-800 "
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
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            Painter
          </a>
          <a href="#" className="text-white">
            Chat
          </a>
          <a href="#" className="text-white">
            Designs
          </a>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-10">
          <Input
            type="search"
            color="white"
            className="pr-10 bg-transparent border-b border-white focus:outline-none"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          {/* <Button
            color="white"
            className=" ml-2 p-1 bg-transparent border border-white rounded hover:bg-white hover:text-blue-gray-900 transition duration-300 h-6 text-xm"
          >
            Search
          </Button> */}

          {/* Adding profile and logout icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-white">
              <RiUserLine className="text-lg" />
            </a>
            <a href="#" className="text-white">
              <RiLogoutCircleLine className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </Navbar>
    );
}

export default ClientNav;