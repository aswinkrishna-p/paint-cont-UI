import React from 'react';
import sidebarimage from '../../Assets/sidebarpic.png'

function ClientCard(props) {
    return (
        <>
        <div className="mt-[4rem] rounded-[22px] bg-[#0D0E26]  w-90 m-5 h-40">
            <img src={sidebarimage} alt="" className='w-full h-full object-cover rounded-[22px]' />
        </div>
        </>
    );
}

export default ClientCard;