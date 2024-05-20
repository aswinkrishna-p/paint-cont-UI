import React from "react";
import { FiMoreHorizontal, FiHeart, FiSend } from 'react-icons/fi'; // Importing additional icons

function ClientPosts({ posts }) {
  return (
    <div className="bg-[#0D0E26] w-full m-5 h-auto overflow-y-auto mt-[4rem] p-3"> {/* Adjusted margin-top */}
      {posts.map((post) => (
        <div key={post._id} className="flex flex-col items-start mb-4 p-2">
          <div className="flex items-center bg-gray-800 rounded-2xl mb-2 justify-between w-full h-16">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden w-14 h-14 m-2">
                <img
                  src={post.painterId.profile || "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-semibold">{post.painterId.username}</p>
            </div>
            <div className="flex items-center">
              <button className="text-white p-1 rounded-xl bg-blue-gray-300 mr-2">Connect</button>
              <FiMoreHorizontal className="text-white cursor-pointer" />
            </div>
          </div>
          {/* Post content */}
          <p className="text-white mb-2">{post.description}</p>
          {post.media && <img src={post.media} alt="Post Media" className="w-full h-[27rem] rounded-xl object-cover" />}
          
          {/* Like button and comment box */}
          <div className="flex justify-between w-full mt-2">
            <button className="flex items-center text-white">
              <FiHeart className="mr-2" /> Like
            </button>
            <div className="flex flex-col w-52 ">
              <div className="flex items-center justify-between border-b-2 rounded-md">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="bg-transparent text-white flex-1 w-8 p-1 focus:outline-none"
                />
                <button className="text-white w-6 ">
                  <FiSend />
                </button>
              </div>
              {/* Display comments */}
              {/* <div className="mt-2 bg-gray-800 p-2 rounded-lg">
                {post.comments && post.comments.map((comment, index) => (
                  <p key={index} className="text-white mb-1">{comment}</p>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientPosts;
