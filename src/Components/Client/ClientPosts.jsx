import React from "react";
import { FiMoreHorizontal } from 'react-icons/fi';

function ClientPosts({ posts }) {
  return (
    <div className="bg-[#0D0E26] w-full m-5 h-auto overflow-y-auto mt-[35rem] p-3">
      {posts.map((post) => (
        <div key={post._id} className="flex flex-col items-start  mb-4  p-2">
          <div className="flex items-center bg-gray-800 rounded-2xl justify-between w-full h-16">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden w-14 h-14 m-2">
                <img
                  src={post.painterId.profile ||"https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"}
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
          <p className="text-white mb-4">{post.description}</p>
          {post.media && <img src={post.media} alt="Post Media" className="w-full h-[27rem] rounded-xl object-cover" />}
        </div>
      ))}
    </div>
  );
}

export default ClientPosts;
