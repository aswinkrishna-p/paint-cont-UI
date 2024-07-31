import React, { useState } from 'react';
import ClientNav from '../../Components/Client/ClientNav';
import painter from '../../Assets/roller.gif'
import toast, { Toaster } from "react-hot-toast";
import { getContact } from '../../api/userApi';

function ClientContact() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await getContact(formData)
      if (response.data.success) {
        toast.success('Message sent successfully');
        setFormData({
          name: '',
          mail: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.name.trim()) {
      toast.error('Name is required');
      isValid = false;
    }
    if (!formData.mail.trim()) {
      toast.error('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
      toast.error('Invalid email format');
      isValid = false;
    }
    if (!formData.message.trim()) {
      toast.error('Message is required');
      isValid = false;
    }
    return isValid;
  };

  return (
    <>
      <Toaster />
      <div>
      <ClientNav />
      </div>
      <div className="flex flex-col xl:flex-row justify-center items-center h-screen mx-auto px-4 sm:px-0">
        <div className="xl:w-1/2 flex justify-center mb-10 xl:mb-0">
          <img src={painter} alt="" className="w-full max-w-[400px] xl:max-w-[600px] h-auto rounded-md" />
        </div>
        <div className="bg-[#0D0E26] xl:ml-10 xl:w-1/2 xl:rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full h-11 rounded-md bg-gray-800 focus:outline-none px-4 text-white"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="mail"
              placeholder="Email"
              className="w-full h-11 rounded-md bg-gray-800 focus:outline-none px-4 text-white"
              value={formData.mail}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full h-40 rounded-md bg-gray-800 focus:outline-none px-4 py-2 text-white"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="w-full h-10 rounded-md bg-gray-800 text-white hover:bg-purple-700 focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientContact;