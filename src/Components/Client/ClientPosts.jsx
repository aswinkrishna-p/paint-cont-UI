import React, { useState } from "react";
import { FiMoreHorizontal, FiHeart, FiSend } from 'react-icons/fi'; // Importing additional icons
import { reportPost } from "../../api/postApi";
import toast ,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ClientPosts({ posts }) {


  const [showReportButton, setShowReportButton] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [liked, setLiked] = useState(posts?.liked);
  const [countLike, setCountLike] = useState(posts?.likes?.length);
  const navigate = useNavigate()

  const toggleLike = () =>{
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  const toggleReportButton = (postId) => {
    setShowReportButton(showReportButton === postId ? null :postId);
  };

  const handleReport = async (postId) => {
    if (reportedPosts.includes(postId)) {
      toast.error('You have already reported this post.');
      return;
    }

    try {
      console.log(postId);
      const response = await reportPost(postId);
      if (response.data.success) {
        setReportedPosts([...reportedPosts, postId]);
        toast.success('Reported successfully');
      } else {
        toast.error('Error in reporting the post.');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleNavigate = (painterId) => {
    navigate(`/painterprofile/${painterId}`)
  }

  return (
    <div className="bg-[#0D0E26] w-full m-5 h-auto overflow-y-auto mt-[4rem] p-3"> {/* Adjusted margin-top */}
    <Toaster/>
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
              <p className="text-white font-semibold cursor-pointer" onClick={() => handleNavigate(post.painterId._id)}>{post.painterId.username}</p>
            </div>
            <div className="flex items-center">
              <button className="text-white p-1 rounded-xl bg-blue-gray-300 mr-2">Connect</button>
              <FiMoreHorizontal className="text-white cursor-pointer" onClick={() => toggleReportButton(post._id)} />
              {showReportButton === post._id && !reportedPosts.includes(post._id) &&  (
              <div className=" top-8 right-0 bg-gray-800 text-white rounded-md shadow-lg">
                <button className="text-white" onClick={ () => handleReport(post._id)}>Report</button>
              </div>
            )}
            {reportedPosts.includes(post._id) && (
              <div className="bg-gray-900 p-2 rounded-md bottom-7 right-0">
                <p className="text-white">Reported</p>
              </div>
            )}
            </div>
          </div>
          {/* Post content */}
          <p className="text-white mb-2">{post.description}</p>
          {post.media && <img src={post.media} alt="Post Media" className="w-full h-[27rem] rounded-xl object-cover" />}
          
          {/* Like button and comment box */}
          <div className="flex justify-between w-full mt-2">
            <button className="flex items-center text-white" onClick={toggleLike}>
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
