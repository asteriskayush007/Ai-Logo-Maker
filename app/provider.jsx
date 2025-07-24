"use client"

import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({children}) {

  const {user}=useUser();
  const [userDetail,setUserDetail] = useState();

  useEffect(()=>{
    user&&CheckUserAuth();
  },[user])
  //save user data

  const CheckUserAuth = async () => {
    try {
      const result = await axios.post('/api/users', {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress
      });
      console.log("User saved to Firestore:", result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("🔥 Error saving user to Firestore:", error?.response?.data || error.message);
    }
  };
  
  return (
    <div>
      <UserDetailContext.Provider value={{}}>
        <Header/>
        <div className='px-20 p-4 lg:px-32 xl:px-48  2xl:px-56'>
            {children}
        </div>
      </UserDetailContext.Provider>
        
    </div>
  )
}

export default Provider
