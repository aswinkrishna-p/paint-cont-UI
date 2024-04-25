import React, { useEffect } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile(props) {

    
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!localStorage.getItem("user_token")) {
            //if already logged in
            navigate('/')
        }
    }, [navigate])
    const currentUser = useSelector((state) => state.user.currentUser);
    // if(currentUser){
        //     console.log(currentUser,'current user');
    // }
    return (
        <>
            <ClientNav />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-[#0D0E26] flex flex-col items-center justify-center rounded-3xl shadow-2xl p-8 w-96">
                    <div className="bg-purple-900 rounded-full overflow-hidden w-24 h-24 mb-4">
                        <img
                            src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" 
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center ">
                        <input
                            type="text"
                            readOnly
                            value={currentUser.data.username}
                            className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
                        />
                        <input
                            type="email"
                            readOnly
                            value={currentUser.data.email}
                            className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
                        />
                        <input
                            type="text"
                            placeholder="Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522(257) 563-7401"
                            className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
                        />
                        <div className="flex justify-center align-middle">
                            <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-20">Save</button>
                            <button className="bg-purple-900 text-white border-b-2 ml-1 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-50">Transaction History</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
