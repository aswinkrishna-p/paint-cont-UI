import React, { useEffect ,useRef,useState} from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import { add_address, saveProfilepic } from '../../api/userApi';
import { isValidImageType } from '../../services/validations';
import toast, { Toaster } from 'react-hot-toast';
import uploadImageToFirebase from '../../services/Firebase/imageUploader';


function Profile(props) {
    const [image ,setImage] = useState(undefined)
    const [imageUrl, setImageUrl] = useState("")
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState({ houseNo: "",location: "",pin: "", });
    const navigate = useNavigate()
    const fileRef = useRef(null)
    
    useEffect(() => {
        if (!localStorage.getItem("user_token")) {
            //if already logged in
            navigate('/login')
        }
    }, [navigate])


    const currentUser = useSelector((state) => state.user.currentUser);
    console.log('current user ',currentUser);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
      const handleAddressSubmit = async (e) => {
        console.log('inside handleaddresssubmit');
        e.preventDefault();
        try {
          const data = {
            phoneNo: phone,
            address: { ...address },
            userId:currentUser.data._id
          };
          const response = await add_address(data)
          console.log(response,"from the client profile");
          setPhone("");
          setAddress({ houseNo: "", location: "", pin: "" });
          closeModal();
        }catch (error) {
          console.log("Error adding address:", error);
        }
      }
    
      const handleAddressChange = (e) => {
        setAddress({
          ...address,
          [e.target.name]: e.target.value,
        });
      };

      const handleFileChange = (e) =>{
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
              const fileUrl = await uploadImageToFirebase(image , "profilepic/")
              if(!fileUrl) return toast.error("error uploading image")

                // const data = {
                //   imageUrl: fileUrl, 
                //   userId : currentUser.data._id
                // }

                const savepic = await saveProfilepic(fileUrl,currentUser.data._id)

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
    return (
        <>
            <ClientNav />
            <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center bg-[#0D0E26] rounded-3xl shadow-2xl p-8 h-[420px] w-96">
          <Toaster/>
          <div className="bg-purple-900 rounded-full overflow-hidden w-24 h-24 mb-4">
            <input type="file" id='profilepic' name='profilepic' ref={fileRef} hidden accept='image/*' 
              onChange={handleFileChange}
            />
            <img
              src={`${imageUrl}` || currentUser?.data?.profile  ||"https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" }
              alt="Profile"
              className="w-full h-full object-cover"
              onClick={() => fileRef.current.click()}
            />
          </div>
          <div className="flex flex-col items-center">


  {currentUser ? (
    <>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">{currentUser.user.username}</div>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">{currentUser.user.email}</div>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">
  {currentUser.user.address? `${currentUser.user.address.houseNo}, ${currentUser.user.address.location}, ${currentUser.user.address.pin}` : "No address available"}
</div>
    </>
  ) : (
    <>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">username</div>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">email</div>
      <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">location,address,pin</div>
    </>
  )}
</div>


          <div>
            <button onClick={openModal} className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-32">
            {currentUser.user.address? "Edit Address" : "Add Address"}
            </button>
            {/* Modal component */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Post Modal" className="absolute inset-0 flex items-center justify-center" overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75" closeTimeoutMS={200}>
              <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <h5>Phone No:</h5>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="90XXXXXXXX"
                  type="text"
                />
                <h5>Address</h5>
                <input
                  name="houseNo"
                  value={address.houseNo}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="House No"
                  type="text"
                />
                <input
                  name="location"
                  value={address.location}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="Location"
                  type="text"
                />
                <input
                  name="pin"
                  value={address.pin}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="Pin"
                  type="text"
                />

                <div className="flex justify-between">
                  <button onClick={handleAddressSubmit} className="bg-red-800 text-white py-2 px-6 rounded-lg mr-4">Save</button>
                  <button onClick={closeModal} className="bg-red-800 text-white py-2 px-6 rounded-lg">Close Modal</button>
                </div>
              </div>
            </Modal>

            <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 ml-4 rounded-md focus:outline-none w-28">Transaction</button>
          </div>
            {/* <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 ml-4 rounded-md focus:outline-none w-28">Save</button> */}
        </div>
      </div>
        </>
    );
}

export default Profile;
