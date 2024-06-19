import React, { useRef, useState,useEffect } from "react";
import Modal from 'react-modal'
import { FiMoreHorizontal, FiHeart, FiSend } from 'react-icons/fi'; // Importing additional icons
import PainterNav from "../../Components/Painter/PainterNav";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { reportPost } from "../../api/postApi";
import { getPainterPosts } from "../../api/postApi";
import { followPainter, getFollowers, getPainter } from "../../api/painterApi";


function UserPainterProfile() {
  const [imageUrl,setImageUrl] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()
  const [painter ,setPainter] = useState(null)
  const [slots ,setSlots] = useState([])
  const [ painterPosts, setPainterPosts] = useState([])
  const [showReportButton, setShowReportButton] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const [countFollow, setCountFollow] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);

  const userToken = localStorage.getItem("user_token");
  const painterToken = localStorage.getItem("painter_token");

  useEffect(() => {
    if (!userToken && !painterToken) {
      navigate('/login');
    }
  }, [navigate, userToken, painterToken]);

const currentUser = useSelector((state) => state.user.currentUser);
const userId = currentUser.user._id
// console.log('current user ',currentUser);

const fetchPainter = async (id) => {
  try {
    // console.log('inside hereeeeeeeee');
    const response = await getPainter(id);
    if (response.data && response.data.painter) {
      setPainter(response.data.painter);
      setSlots(response.data.painter.slot)
      console.log('Painter slots:', response.data.painter.slot);
      console.log('Painter:', response.data.painter);
      setFollow(response.data.painter.followers.includes(userId))
      setCountFollow(response.data.painter.followers.length)
    } else {
      console.error('No painter data found');
      setPainter(null);
    }
  } catch (error) {
    console.error('Error fetching painter:', error);
    setPainter(null);
  }
};

useEffect(() => {
  fetchPainter(id)
  },[id])
  
  // console.log('painter state',painter.username);
  const fetchPainterPosts = async (id) => {
    try {
      const posts = await getPainterPosts(id);
      // console.log(posts,'postsssssssss');
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
      const response = await getFollowers(id)
      if(response.data.success){
        console.log(response.data.data,'dataaaaaaa');
        console.log(followers[0].profile,'prifileee');
        setFollowers(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollow = async () =>{
    try {
      const data = {painterId:id,userId}
      console.log('data in follow',data);

      const res = await followPainter(data)
      if(res.data.success){
        setFollow(res.data.data)
      
      }
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setShowChatModal(false);
  };










  return (
    <>
      <PainterNav/>
      <div className="flex h-full flex-col items-center bg-deep-orange-900">
        <Toaster/>
        <div className=" pt-8 w-full ">
          <div className="flex flex-col gap-6 mt-7 w-full">
            {/* Profile Section */}
            {painter ? (
              <div className="relative mb-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-start">
                    <img
                      src={imageUrl || painter.profile || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 cursor-pointer shrink-0"
                      alt="Profile"
                    />
                    <h1 className="text-xl font-bold">{painter.username}</h1>
                    <p className="text-gray-700">Age: {painter.age || 'Add your Age'}</p>
                    <p className="text-gray-700">Location: {painter.location || 'Add your Location'}</p>
                    <p className="text-gray-700">Phone: {painter.phone || 'Add your phone number here'}</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <div className="relative inline-block m-2">
                        <button
                          className="border-transparent relative z-10 py-2 px-4 w-24 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                          onClick={handleFollow}
                        >
                        {follow ? "Unfollow" : "Follow"}
                        </button>
                        <button
                          className="border-transparent relative z-10 py-2 px-4 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                          onClick={openModal}
                        >
                          Followers: {countFollow}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Modal isOpen={showChatModal} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center bg-gray-800 mt-8 bg-opacity-75">
        <div className="bg-white rounded-lg w-[350px] p-3 h-[500px]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Followers List</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>
          <div className="h-[420px] border rounded-[20px]">
            <div className="overflow-auto h-full">
              {followers?.length > 0 ? (
                followers?.map((follower, index) => (
                  <div key={index} className="flex items-start mb-4 p-2 ml-8">
                    <img src={followers[index].profile || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                    <div className="bg-gray-100 rounded-lg p-1">
                      <p className="text-sm text-gray-700">{follower.username}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">0 followers</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                      Specialised:
                    </span>
                    <ul className="flex">
                      {painter.specialised.map((speciality, index) => (
                        <li key={index} className="mb-2 ml-4">{speciality}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p>Painter not found</p>
            )}
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

  {/* Dynamically render slots */}
  {slots?.length > 0? (
    slots.map((slot, index) => (
      <div key={index} className="flex flex-col items-center justify-center m-5">
        <div className="bg-blue-500 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">{slot.start} - {slot.end}</div>
        <div className="bg-green-500 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">Date: {slot.date.toString().split("T")[0]}</div>
        <div className="bg-yellow-500 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">Status: {slot.status}</div>
      </div>
    ))
  ) : (
    <div className="flex flex-col items-center justify-center m-5">
      <div className="bg-red-500 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">No slots available</div>
    </div>
  )}

  {/* Buttons */}
  <div className="flex flex-row items-center justify-center m-5">
    <div className="bg-amber-500 rounded-lg p-3 m-2">
      <p>Book slots</p>
    </div>
    <div className="bg-orange-900 p-3 rounded-lg">
      <p>Cancel slot</p>
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
