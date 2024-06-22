import React from 'react'
import './message.css'
import pics from '../../../assets/borcelle-removebg-preview.png'

function Message({own,msgData}) {
    return (
        <div className={own ? "message own" : "message"}>
          <div className="messageTop">
            <img
              className="messageImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <p className="messageText">{msgData}</p>
          </div>
          <div className="messageBottom">9078</div>
        </div>
      );
}

export default Message