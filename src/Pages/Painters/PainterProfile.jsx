import React, { useRef, useState,useEffect } from "react";
import Modal from 'react-modal'
import PainterNav from "../../Components/Painter/PainterNav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isValidImageType } from "../../services/validations";
import toast, { Toaster } from "react-hot-toast";
import uploadImageToFirebase from "../../services/Firebase/imageUploader";
import { saveProfilepic, uploadPost } from "../../api/painterApi";

function PainterProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState(undefined)
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [imageUrl,setImageUrl] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const descriptionRef = useRef(null);
  const navigate = useNavigate()
  const fileRef = useRef(null)


  useEffect(() => {
    if (!localStorage.getItem("painter_token")) {
        //if already logged in
        navigate('/painter/login')
    }
}, [navigate])

const currentpainter = useSelector((state) => state.painter.currentUser)
console.log(currentpainter);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const  handleFileChange = (e) =>{
    if(e.target.files && e.target.files[0]){
      console.log('inside file chanegee');
      if(!isValidImageType(e.target.files[0].name)){
        return toast.error("only images are allowed")
      }else{
        setImage(e.target.files[0])
        setIsImageChanged(true)
      }
    }
  }

  useEffect (() =>{
    if(isImageChanged){
      handleProfileUpdate()  
      setIsImageChanged(false)
    }
  },[isImageChanged])

  const handleProfileUpdate = async () =>{
    if(image){
      console.log('inside the profile update');
      try {
        const fileUrl = await uploadImageToFirebase(image , "PainterProfilePic/")
        if(!fileUrl) return toast.error("error uploading image")

          // const data = {
          //   imageUrl: fileUrl, 
          //   userId : currentUser.data._id
          // }

          const savepic = await saveProfilepic(fileUrl,currentpainter.user._id)

          if(savepic.data.success){
            setImageUrl(fileUrl)
            toast.success("profile pic updated successfully")
          }else{
            toast.error("error in updating profile pic")
          }
      } catch (error) {
        console.log(error);
      }
    }
  }


  const handleAvatarChange = (files) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (isValidImageType(selectedFile.name)) {
        setSelectedAvatar(selectedFile);
        setPreviewAvatar(URL.createObjectURL(selectedFile)); // Create object URL for preview
      } else {
        // Display error message for invalid file format
        toast.error("Invalid file format. Please select an image (JPEG, PNG, GIF, BMP).");
        setSelectedAvatar(null);
        setPreviewAvatar(null);
      }
    } else {
      setSelectedAvatar(null);
      setPreviewAvatar(null);
    }
  };

  const handlePostSubmit = async (e) =>{
      e.preventDefault();

      if(selectedAvatar){
        try {
          const fileUrl = await uploadImageToFirebase(selectedAvatar, "PainterPost/")
          if(!fileUrl) return toast.error("Error uploading files")
            console.log('file url',fileUrl);
            const data ={
             imageUrl:fileUrl,
             description:descriptionRef.current.value,
             painterId:currentpainter.user._id
            }

            const uploadpost = await uploadPost(data)
            if(uploadpost.data.success){
              toast.success('post uploaded successfully')
              setDescription('')
              setPreviewAvatar(null)
              closeModal()
            }else{
              toast.error(uploadpost.data.message)
            }
        } catch (error) {
          console.error('error uploading image ',error);
        }
      }else{
        console.log("NO  image selected");
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
                  <input type="file" id="profilepic" name="profilepic" ref={fileRef} hidden  accept="image/*"
                  onChange={handleFileChange}
                  />
                  <img
                    src={`${imageUrl}` || currentpainter.user.profile || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 cursor-pointer shrink-0"
                    alt="Profile"
                    onClick={() => fileRef.current.click()}
                  />
                  <h1 className="text-xl font-bold">{currentpainter.user.username}</h1>
                  <p className="text-gray-700">Professional Painter</p>
                  <p className="text-gray-700">Location:Kerala ,Calicut</p>
                  <p className="text-gray-700">Phone:2345362346345</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Follow
                    </a>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      Message
                    </a>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex ">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    specialised :
                  </span>
                  <ul className="flex ">
                    <li className="mb-2 ml-4">#interior</li>
                    <li className="mb-2 ml-4">#interior</li>
                    <li className="mb-2 ml-4">#interior</li>
                    <li className="mb-2 ml-4">#interior</li>
                    <li className="mb-2 ml-4">#interior</li>
                    <li className="mb-2 ml-4">#interior</li>
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

        <div className=" min-w-[90rem] max-auto rounded-2xl bg-[#0D0E26] min-h-[30rem]">
                              {/* Conditional rendering for Add Post button */}
                              {!modalIsOpen && (
                  <div className="relative inline-block  m-2">
                    {/* Button to open modal */}
                    <button
                      className="border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                      onClick={openModal}
                    >
                      Add Post
                    </button>
                  </div>
                )}


                  {/* Modal component */}
                  <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Add Post Modal"
                  className="absolute inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
                  closeTimeoutMS={200} // Adjust modal close animation time
                >
                  <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Add Post</h2>
                    <input
                      type="file"
                      className="py-2 px-4 text-white rounded-full mb-4"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e.target.files)}
                    />
                    <div className="w-40 h-40 mb-4">
                      <img
                        src={previewAvatar}
                        alt="Profile pic"
                        className="w-full h-full rounded-full  object-cover"
                      />
                    </div>
                    <input
                      className="border py-2 px-4 mb-4 w-full"
                      placeholder="Type post description"
                      type="text"
                      name="description"
                      id="description"
                      ref={descriptionRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={handlePostSubmit}
                        className=" bg-blue-800 text-white py-2 px-6 rounded-lg mr-4"
                      >
                        Save
                      </button>
                      <button
                        onClick={closeModal}
                        className="bg-red-800 text-white py-2 px-6 rounded-lg"
                      >
                        Close Modal
                      </button>
                    </div>
                  </div>
                </Modal>
        </div>
      </div>
    </>
  );
}

export default PainterProfile;
