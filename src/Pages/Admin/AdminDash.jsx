import React ,{useEffect , useState}from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { useNavigate } from "react-router-dom";
import AdminGraph1 from "../../Components/Admin/AdminGraph1";
import AdminGraph2 from "../../Components/Admin/AdminGraph2";
import { adminDashBoard } from "../../api/adminApi";





function AdminDash(props) {

  const [user,setUser] = useState([])
  const [blockedUser,setBlockeduser] = useState([])
  const [blockedPainter,setBlockedPainter] = useState([])
  const [painter,setPainter] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      //if already logged in
      navigate('/adminlogin')
    }
  }, [navigate])


  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = async () => {
    try {
      const response = await adminDashBoard()
      setUser(response.data.users)
      setPainter(response.data.painters)
      setBlockeduser(response.data.blockedUsers)
      setBlockedPainter(response.data.blockedPainters)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex">
   
      <AdminNav />
    

    <div>

      <div className="flex justify-evenly mt-20">

        <div className="rounded-[20px] font-bold flex justify-center items-center border w-[200px] h-[100px]">
          <p className="text-white">Users : {user.length}</p>
        </div>
        <div className="rounded-[20px] font-bold flex justify-center items-center border w-[200px] h-[100px]">
          <p className="text-white">Painters : {painter.length}</p>
        </div>
        <div className="rounded-[20px] flex font-bold justify-center items-center border w-[200px] h-[100px]">
          <p className="text-white">Blocked Users : {blockedUser.length}</p>
        </div>
        <div className="rounded-[20px] flex font-bold justify-center items-center border w-[200px] h-[100px]">
          <p className="text-white">Blocked Painters : {blockedPainter.length}</p>
        </div>

      </div>


    <div className="flex justify-around w-full h-[10rem] p-4 mt-14">   

      <div className="w-[600px]">
        <AdminGraph1 />
      </div>
      <div className="ml-8 w-[600px]">
        <AdminGraph2 />
      </div>
      
    </div>

    </div>
  </div>
  )
}

export default AdminDash;
