import React, { useEffect, useState } from 'react'
import './Conversations.css'
// import img from '../../../assets/user-removebg.png'
// import axios from '../../../Services/axiosService'

function Conversations({conversation,me,indConv,painterName}) {


  const [user,setUser] = useState(null)




  // useEffect(()=>{

  //   const friendId = conversation.members.find((m) => m !== me.currentUser._id)

  //   // console.log(me,"njan ivide und 🕺🕺🕺🕺🕺");

  //   const getUser =  async () => {
  //     try {
  //       const res = await axios.post(`/user?userId=${friendId}`)
  //       // setUser(res.data)
  //     }catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getUser()
  // },[me,conversation])

  return (
    <div className='conversation' >
     <img className='conversationImg' src={""} alt="" />
     <span className="conversationName">{painterName}</span>
    </div>
  )
}

export default Conversations