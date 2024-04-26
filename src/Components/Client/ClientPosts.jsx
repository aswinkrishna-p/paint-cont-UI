import React from "react";
import { FiMoreHorizontal } from 'react-icons/fi';

function ClientPosts(props) {
  return (
    <>
      <div className="bg-[#0D0E26] w-full m-5 h-full p-3">
        <div className="flex items-center justify-between bg-gray-400 h-16 mt-20 rounded-2xl mb-4  p-2">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden w-14 h-14 m-2">
              <img
                src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white font-semibold">aswin krishna</p>
          </div>
          <div className="flex items-center">
            <button className="text-white p-1 rounded-xl bg-blue-gray-800 mr-2">Connect</button>
            <FiMoreHorizontal className="text-white cursor-pointer" />
          </div>
        </div>
        {/* Post content */}
       <p className="text-white mb-4">🚀 Exciting Update from KFC! 🎉 We're thrilled to unveil our latest innovation, Fried Chicken! 🌟 This cutting-edge addition reflects our commitment to delivering top-notch solutions. 🏆 Honored to receive the [Award Name], a testament to the hard work of our dedicated team.</p>
       <div className="bg-deep-orange-500 h-[27rem] rounded-2xl"></div>
      </div>
    </>
  );
}

export default ClientPosts;
