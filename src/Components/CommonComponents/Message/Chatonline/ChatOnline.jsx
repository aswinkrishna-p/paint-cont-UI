import React from 'react'
// import pic from "../../../assets/user-removebg.png"
import './ChatOnline.css'

function ChatOnline() {
    return (
        <div className="chatOnline">
          {/* {onlineFriends.map((o) => ( */}
            <div className="chatOnlineFriend" >
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={""}
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">username</span>
            </div>
          {/* ))} */}
        </div>
      );
}

export default ChatOnline