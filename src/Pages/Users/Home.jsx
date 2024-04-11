import React from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import ClientCard from '../../Components/Client/ClientCard';
import ClientHash from '../../Components/Client/ClientHash';
import ClientPosts from '../../Components/Client/ClientPosts';
// import ClientVIP from '../../Components/Client/ClientVIP';

function Home(props) {
    return (
        <>
        <ClientNav />
        <div className="flex  flex-col bg-white sm:flex-row h-screen mt-14 ">
          <div className="fixed flex-initial w-full sm:w-96 bg-black h-screen ">
            <ClientCard />
            <ClientHash />
          </div>
          <div className="flex justify-center items-center  flex-1">
            <ClientPosts />
          </div>
        </div>
      </>
    );
}

export default Home;