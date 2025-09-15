"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logoutUser } from '../../utils/auth';

interface User {
  first_name: string;
  email: string;
  role: string;
}

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifyAgentAccess();
  }, []);

  const verifyAgentAccess = async () => {
    try {
      const userDetails = await getUserInfo();
      if (!userDetails || userDetails.role !== 'agent') {
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
      <h1>Agent Dashboard</h1>
      {user && (
        <p>Welcome, {user.first_name}!</p>
      )}
      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}

export default page