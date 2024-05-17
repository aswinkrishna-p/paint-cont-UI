import React, { useEffect } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import ClientCard from '../../Components/Client/ClientCard';
import ClientHash from '../../Components/Client/ClientHash';
import ClientPosts from '../../Components/Client/ClientPosts';
import { useNavigate } from 'react-router-dom';
import ClientVIP from '../../Components/Client/ClientVIP';
import PainterNav from '../../Components/Painter/PainterNav';

function Home(props) {
  const navigate = useNavigate();

  const userToken = localStorage.getItem("user_token");
  const painterToken = localStorage.getItem("painter_token");


  useEffect(() => {
    if (!userToken && !painterToken) {
      navigate('/login');
    }
  }, [navigate,userToken,painterToken]);
  

    return (
      <div className='h-screen w-full flex flex-row '>
       {userToken && <ClientNav />} 
       {painterToken && <PainterNav />} 
          <div className="w-[23rem]  h-full bg-black">
            <ClientCard />
            <ClientHash />
            <ClientVIP />
          </div>
            <div className='h-full w-full flex items-center justify-center'>
            <ClientPosts />
            </div>
        </div>
    );
}

export default Home;
