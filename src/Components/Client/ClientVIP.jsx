import React from 'react';

function ClientVIP(props) {
    return (
        <div className="mt-5 p-5 rounded-[22px] bg-[#0D0E26] h-60 w-90 m-5 text-white">
            <div className="flex items-center mb-2">
                <div className="bg-gray-400 rounded-full p-1 flex items-center justify-center w-8 h-8 mr-2">
                    <span className="text-black font-bold">VIP</span>
                </div>
                <h1 className="text-xl font-semibold">Upgrade to VIP membership</h1>
            </div>
            <ul className="text-gray-400 mb-2 space-y-1">
                <li>• Exclusive Access: Gain access to premium content, features, and services</li>
                <li>• Enhanced Experience: Enjoy an ad-free experience with priority support</li>
                <li>• 24x7 admin support</li>
            </ul>
            <button className="bg-gray-600 text-white py-2 px-4 rounded-full w-full flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l1.09 3.26L16 6.34l-2.64 2.3L14.18 12 12 10.27 9.82 12l.82-3.36L8 6.34l2.91-.08L12 2z"/>
                </svg>
                Upgrade to plus
            </button>
        </div>
    );
}

export default ClientVIP;
