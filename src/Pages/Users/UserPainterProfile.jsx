import React, { useRef, useState,useEffect } from "react";
import Modal from 'react-modal'
import { FiMoreHorizontal, FiHeart, FiSend } from 'react-icons/fi'; // Importing additional icons
import PainterNav from "../../Components/Painter/PainterNav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { reportPost } from "../../api/postApi";
import { getPainterPosts } from "../../api/postApi";


function UserPainterProfile() {
  const [imageUrl,setImageUrl] = useState("")
  const navigate = useNavigate()
  const [ painterPosts, setPainterPosts] = useState([])
  const [showReportButton, setShowReportButton] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const [countFollow, setCountFollow] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);


  useEffect(() => {
    if (!localStorage.getItem("painter_token")) {
        //if already logged in
        navigate('/painter/login')
    }
}, [navigate])

const currentpainter = useSelector((state) => state.painter.currentUser)
const id = currentpainter.user._id
console.log(currentpainter,'currentpainter');




  const fetchPainterPosts = async (id) => {
    try {
      const posts = await getPainterPosts(id);
      console.log(posts,'postsssssssss');
      if (posts) {
        setPainterPosts(posts.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchPainterPosts(id)
  },[])




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

  const openModal = async () =>{
    setShowChatModal(true)
    try {
      
    } catch (error) {
      console.log(error);
    }
  }










  return (
    <>
      <PainterNav/>
      <div className="flex h-full flex-col items-center bg-deep-orange-900">
        <Toaster/>
        <div className=" pt-8 w-full ">
          <div className="flex flex-col gap-6 mt-7 w-full">
            {/* Profile Section */}
            <div className=" relative  mb-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-start">
                  <img
                    src={`${imageUrl}` || currentpainter.user.profile || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 cursor-pointer shrink-0"
                    alt="Profile"
                  />
                  <h1 className="text-xl font-bold">{currentpainter.user.username}</h1>
                  <p className="text-gray-700 placeholder:Age ">Age:{currentpainter.user.age ? currentpainter.user.age : 'Add your Age'}</p>
                  <p className="text-gray-700 placeholder:location ">Location:{currentpainter.user.location ? currentpainter.user.location : ' Add your Location'}</p>
                  <p className="text-gray-700 ">Phone:{currentpainter.user.phone ? currentpainter.user.phone : ' Add your phone number here'}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {/* Conditional rendering for Add Post button */}
                  
                  <div className="relative inline-block  m-2">
                    {/* Button to open modal */}
                    <button
                      className="border-transparent relative z-10 py-2 px-4 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                    
                    >
                      Follow
                    </button>
                    <button
                      className="border-transparent relative z-10 py-2 px-4 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                      onClick={openModal}
                    >
                      Followers:
                    </button>
                  </div>
              
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex ">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    specialised :
                  </span>
                  <ul className="flex ">
                    {currentpainter.user.specialised.map((speciality ,index) => (
                      <li key= {index} className="mb-2 ml-4">{speciality}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About Me Section */}
        <div className="flex flex-col m-5 mb-7">
          <div className="bg-[#0D0E26] shadow rounded-lg p-6">
            <div>
              <h2 className="text-xl font-bold mb-4">About Me</h2>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              finibus est vitae tortor ullamcorper, ut vestibulum velit
              convallis. Aenean posuere risus non velit egestas suscipit. Nunc
              finibus vel ante id euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
              erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
              rhoncus id.
              {/* {currentpainter.user.aboutMe} */}
            </p>

            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
                <p>
                  <span className="text-gray-700 mr-2">at ABC Company</span>
                  <span className="text-gray-700">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
                <p>
                  <span className="text-gray-700 mr-2">at ABC Company</span>
                  <span className="text-gray-700">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
                <p>
                  <span className="text-gray-700 mr-2">at ABC Company</span>
                  <span className="text-gray-700">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white h-[35rem] w-[50rem] rounded-2xl mb-6">
          <p className="m-3 uppercase font-semibold">Available slots:</p>

          {/* First set of blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-center m-5">
            <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            </div>
          </div>

          {/* "Afternoon" text */}
          <p className="text-center mt-5 mb-2 uppercase font-semibold ">After noon:</p>

          {/* Second set of blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-center m-5">
            <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-center m-5">
            <div className="bg-amber-500 rounded-lg p-3 m-2">
              <p>Add new slot</p>
            </div>
            <div className="bg-orange-900 p-3 rounded-lg">
              <p>Edit slot</p>
            </div>
          </div>
        </div>

                {/* My posts  */} 
                {painterPosts.map((post) => (
               <div className=" min-w-[90rem] max-auto rounded-2xl p-5 bg-[#0D0E26] min-h-[30rem]">
           
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
              
        </div>
      ))}
      </div>
    </>
  );
}

export default UserPainterProfile;
