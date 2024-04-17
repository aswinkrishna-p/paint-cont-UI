import React from 'react';

function Profile(props) {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="p-8 rounded-lg shadow-md bg-[#0D0E26]" >
                <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden">
                        <img className="object-cover h-full w-full" src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" alt="Profile" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex justify-center">
                    <button className='submit text-white bg-[#3E45DF] rounded-lg py-2 px-3 font-semibold uppercase hover:bg-[#1c2294] transition duration-300' >submit</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
