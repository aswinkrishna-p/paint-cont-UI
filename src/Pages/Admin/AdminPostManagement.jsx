import React, { useState, useEffect } from 'react';
import AdminNav from '../../Components/Admin/AdminNav';
import ClientPosts from '../../Components/Client/ClientPosts';
import toast from "react-hot-toast";
import { deletePosts, GetDeletePosts } from '../../api/adminApi';

function AdminPostManagement() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      console.log('inside fetch post');
      const response = await GetDeletePosts()
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts ,typeof(posts) ,'posts in admin post mang');
  const deletePost = async (postId) => {
    try {
      const response = await deletePosts(postId)
      console.log(response, "I'm here ");
      if (response.success) {
        toast.success("Post deleted successfully");
        fetchPost(); // Refresh the posts after deletion
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Error deleting post");
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="flex">
      <div className="border">
        <AdminNav />
      </div>

      <div className="flex flex-col items-center w-full">
        <div>
          <p className="text-white text-center text-4xl mt-4">Reported Post's</p>
        </div>

        <div className="flex flex-col w-full md:w-[70%] h-[100%] rounded-xl mt-4">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <div className="block rounded-xl bg-[#50187b67] m-1 md:m-5 h-100 md:h-[470px]" key={post._id}>
                  <div className="flex justify-center ">
                  <ClientPosts posts={posts} />
                  </div>
                  <p
                    onClick={() => handleDeletePost(post._id)}  // Pass the postId correctly here
                    className="text-white text-center border border-white-500 bg-red-700 rounded-md px-4 py-2 cursor-pointer hover:bg-red-900 transition duration-300 ease-in-out"
                  >
                    Delete
                  </p>

                </div>
              );
            })
          ) : (
            <p>No reported posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPostManagement;
