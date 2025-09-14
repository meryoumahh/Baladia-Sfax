"use client";

import React, { useState, useEffect } from 'react';
import { getUserInfo, logoutUser, getAgentList } from '../../utils/auth';
import Agents from '@/components/Admindashboard/Agents';

interface User {
  first_name: string;
  email: string;
}


const Page = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getuser = async () => {
      const userDetails = await getUserInfo();
      if (userDetails) setUser(userDetails);
    };
    getuser();
  }, []);

 

  const handleLogOut = async () => {
    await logoutUser();
    window.location.href = "/";
  };



  return (
    <div className="p-4">
      {user ? (
        <h1>Hi, {user.first_name}, your email is {user.email}</h1>
      ) : (
        <h1>Welcome stranger</h1>
      )}
      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>
      <Agents/>
      
    </div>
  );
};

export default Page;
