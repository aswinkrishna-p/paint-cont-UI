import React, { useEffect, useState } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import { useNavigate } from 'react-router-dom';
import { getBookings } from '../../api/userApi';
import { useSelector } from 'react-redux';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser.user._id

    console.log(bookings,'booking sate');
    
    useEffect(() => {
       
        const fetchBookings = async () => {
            
            const response = await getBookings(userId)
            
            console.log( response.data.data ,'inside the booking functions');
            if(response){

                setBookings(response.data.data);
            }
        };
        
        fetchBookings();
    }, []);

    const handleChatRedirect = (painterId) => {
        navigate(`/chat/${painterId}`);
    };

    return (
        <>
            <ClientNav />
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col  h-[35rem] w-[50rem] rounded-2xl custom-box-shadow bg-white">
                    <h1 className="font-bold flex justify-center items-center text-xl p-4 ">Your Bookings</h1>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className="flex flex-row justify-evenly border-b-2 py-4">
                                <h2 className="text-xl font-semibold">{booking.painterId.username}</h2>
                                <p className="text-gray-600">Date: {booking.slotId.date}</p>
                                <button 
                                    onClick={() => handleChatRedirect(booking.painterId._id)} 
                                    className="bg-blue-500 text-white py-1 px-4 rounded-md mt-2 hover:bg-blue-600"
                                >
                                    Message Painter
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No bookings found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Bookings;
