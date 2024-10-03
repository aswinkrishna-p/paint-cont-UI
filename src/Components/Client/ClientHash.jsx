import React from 'react';

function ClientHash(props) {
    const hashtags = Array(20).fill('#Interior'); // Array to hold the hashtags

    return (
        <div className=" rounded-[22px] bg-white custom-box-shadow lg:w-[23rem] md:w-60 sm:w-30 mx-auto m-5 h-auto sm:h-48 md:h-56 lg:h-60 p-3 text-gray-400">
            <h2 className="text-lg font-serif font-bold mb-1 text-black"># Hash Tags</h2>
            <div className="grid grid-cols-4 gap-2">
                {hashtags.map((tag, index) => (
                    <span 
                        key={index} 
                        className="bg-gray-600 rounded-full px-2 py-1 text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ClientHash;
