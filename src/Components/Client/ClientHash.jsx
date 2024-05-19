import React from 'react';

function ClientHash(props) {
    const hashtags = Array(20).fill('#Interior'); // Array to hold the hashtags

    return (
        <div className=" rounded-[22px] bg-[#0D0E26] w-90 m-5 h-auto p-3 text-gray-400">
            <h2 className="text-lg font-semibold mb-1">#hashtags</h2>
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
