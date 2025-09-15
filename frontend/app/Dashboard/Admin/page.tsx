"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logoutUser, getAgentList } from '../../utils/auth';
import Agents from '@/components/Admindashboard/Agents';

interface User {
  first_name: string;
  email: string;
  is_staff: boolean;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifyAdminAccess();
  }, []);

  const verifyAdminAccess = async () => {
    try {
      const userDetails = await getUserInfo();
      if (!userDetails || !userDetails.is_staff) {
        router.push('/auth/signin');
        return;
      }
      setUser(userDetails);
    } catch (error) {
      router.push('/auth/signin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = async () => {
    await logoutUser();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Verifying access...</div>
      </div>
    );
  }

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
