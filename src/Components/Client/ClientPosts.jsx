import React, { useEffect, useState } from "react";
import { FiMoreHorizontal, FiHeart, FiSend } from 'react-icons/fi'; // Importing additional icons
import { addComment, reportPost, updateLike } from "../../api/postApi";
import toast ,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Adjusted import
import Modal from "react-modal";

function ClientPosts({ posts }) {
  const [showReportButton, setShowReportButton] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [countLike, setCountLike] = useState(posts?.likes?.length);
  const [showChatModal, setShowChatModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null); // To track the current post
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const navigate = useNavigate()

  const currentpainter = localStorage.getItem('painter_token')
  const currentuser = localStorage.getItem('user_token')

  let likerId = null;
  if (currentpainter) {
    const decodedPainter = jwtDecode(currentpainter);
    console.log(decodedPainter.userData,'painter decode');
    likerId = decodedPainter.userData; 
  } else if (currentuser) {
    const decodedUser = jwtDecode(currentuser);
    console.log(decodedUser.userData,'user decode');

    likerId = decodedUser.userData; 
  }

  useEffect(() => {
    const LikedPosts = posts
      .filter(post => post.likes.includes(likerId))
      .map(post => post._id);
    setLikedPosts(LikedPosts);
  }, [posts, likerId]);

  useEffect(() => {
    if (currentPostId) {
      const post = posts.find(p => p._id === currentPostId);
      if (post) {
        setCurrentPostComments(post.comments || []);
      }
    }
  }, [currentPostId, posts]);

  const toggleLike = async (postId) =>{
    try {
      const data = {postId ,userId:likerId}

      const response = await updateLike(data)
      console.log(response.data.data.likes,'after this');
      if (response.data.success) {
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.includes(postId)
            ? prevLikedPosts.filter((id) => id !== postId)
            : [...prevLikedPosts, postId]
        );
        toast.success(response.data.message || 'Action successful');
      } else {
        toast.error('Error in liking the post.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openModal = (postId) => {
    setCurrentPostId(postId);
    setShowChatModal(true);
  };

  const closeModal = () => {
    setShowChatModal(false);
    setCurrentPostId(null);
    setNewComment("");
  };

  const submitComment = async (postId) => {
    try {
      const data = { postId, userId: likerId, content: newComment };
      const response = await addComment(data);
      if(response.data.success){
        const updatedComments = [...currentPostComments, response.data.data.text];
        // console.log(response.data.data.text,'textt');
        setCurrentPostComments(updatedComments);
        setNewComment("");
        toast.success('Comment added successfully');
      } else {
        toast.error('Error in adding comment.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in adding comment.');
    }
  };

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
            <button className="flex items-center text-white" onClick={() => toggleLike(post._id)}>
            <FiHeart className="mr-2" color={likedPosts.includes(post._id) ? "red" : "white"} /> Like
              
            </button>
            <div className="flex flex-col w-52 ">
              <div className="flex items-center justify-between border-b-2 rounded-md">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="bg-transparent text-white flex-1 w-8 p-1 focus:outline-none"
                  onClick={() => openModal(post._id)}
                />
                <button className="text-white w-6 ">
                  <FiSend />
                </button>
              </div>
              {/* Display comments */}
              <Modal isOpen={showChatModal} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center  bg-purple-950 bg-opacity-75 ">
         {/* from-purple-900 via-purple-900 to-indigo-800  */}
        <div className=" bg-[#50187bc4] rounded-lg w-[700px] p-5 h-[560px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Comments</h2>
            <button onClick={closeModal} className="text-white hover:text-red-600 font-bold">&times;</button>
          </div>
          <div className="h-[420px] p-4 border border-purple-800 rounded-[16px]">
            <div className="overflow-auto h-full">
              {currentPostComments.map(comment => (
                <div key={comment._id} className="flex items-start mb-4">
                  {/* <img src={userImg} alt="Avatar" className="w-10 h-10 rounded-full mr-3" /> */}
                  <div>
                    <p className="text-white font-semibold">{comment.userId?.username}</p>
                    <div className="bg-purple-800  rounded-lg p-2">
                      <p className="text-sm text-white">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex p-1">
            <input 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add a comment" 
              className="bg-purple-800 focus:outline-none rounded-[6px] h-[38px] w-full mt-3 pl-4 text-white" 
              type="text" 
            />
            <button onClick={() => submitComment(currentPostId)} className="bg-purple-800 w-16 h-9 ml-2 mt-3 flex items-center justify-center rounded-[6px]">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </Modal>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientPosts;
