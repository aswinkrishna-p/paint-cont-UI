import React, { useEffect, useState } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import ClientCard from '../../Components/Client/ClientCard';
import ClientHash from '../../Components/Client/ClientHash';
import ClientPosts from '../../Components/Client/ClientPosts';
import { useNavigate } from 'react-router-dom';
import ClientVIP from '../../Components/Client/ClientVIP';
import PainterNav from '../../Components/Painter/PainterNav';
import { getAllPosts } from '../../api/userApi';

function Home(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const userToken = localStorage.getItem("user_token");
  const painterToken = localStorage.getItem("painter_token");

  useEffect(() => {
    if (!userToken && !painterToken) {
      navigate('/login');
    }
  }, [navigate, userToken, painterToken]);

  const allposts = async () => {
    try {
      const allposts = await getAllPosts();
      setPosts(allposts.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allposts();
  }, []);

  return (
    <div className='h-screen w-full flex flex-row '>
      {userToken && <ClientNav />}
      {painterToken && <PainterNav />}
      <div className="w-[35rem] h-full bg-black">
        <ClientCard />
        <ClientHash />
        <ClientVIP />
      </div>
      <div className='h-full w-full overflow-y-auto flex items-center justify-center'>
        <ClientPosts posts={posts} />
      </div>
    </div>
  );
}

export default Home;
