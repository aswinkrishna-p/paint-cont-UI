import React, { useEffect, useState } from 'react'
import './Conversations.css'
import { getPainter } from '../../../../api/painterApi'
// import img from '../../../assets/dummyUser.png'


function Conversations({conversation,me,indConv,painterName,painterId}) {


  const [user,setUser] = useState(null)
  const [profilepic,setProfilepic]=useState('')
 useEffect(()=>{
  console.log(painterId)
    const data =async(painterId)=>{
       const out = await getPainter(painterId)
       setProfilepic(out?.data?.painter?.profilePicture)
    }
    data(painterId)
 },[painterId])

  return (
    <div className='conversation sm:w-[500px] w-[60px]' >
     <img className='conversationImg' src={profilepic || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" } alt="" />
     <span className="conversationName">{painterName}</span>
    </div>
  )
}

export default Conversations