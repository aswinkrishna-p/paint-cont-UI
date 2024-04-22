import React, { useEffect } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import ClientCard from '../../Components/Client/ClientCard';
import ClientHash from '../../Components/Client/ClientHash';
import ClientPosts from '../../Components/Client/ClientPosts';
import { useNavigate } from 'react-router-dom';
import ClientVIP from '../../Components/Client/ClientVIP';

function Home(props) {

    const navigate = useNavigate()

    useEffect(() => {
      if (!localStorage.getItem("user_token")) {
        //if already logged in
        navigate('/login')
      }
    }, [navigate])

  
    return (
        <>
        <ClientNav />
        <div className="flex  flex-col bg-white sm:flex-row  h-screen">
          <div className="fixed flex-initial w-full sm:w-96 top-14 bg-black h-screen ">
            <ClientCard />
            <ClientHash />
            <ClientVIP/>
          </div>
          <div className="flex justify-center items-center  flex-1">
            <ClientPosts />
          </div>
        </div>
      </>
    );
}

export default Home;