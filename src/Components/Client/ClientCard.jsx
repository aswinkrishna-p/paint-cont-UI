import React from 'react';
import sidebarimage from '../../Assets/sidebarpic.png'

function ClientCard(props) {
    return (
        <>
        <div className="mt-[4rem] rounded-[22px] custom-box-shadow bg-white mx-auto md:w-60 m-5 sm:w-30 lg:w-[23rem] h-40 sm:h-48 md:h-56 lg:h-40">
            <img src={sidebarimage} alt="" className='w-full h-full object-cover rounded-[22px]' />
        </div>
        </>
        // bg-[#0D0E26]
    );
}

export default ClientCard;