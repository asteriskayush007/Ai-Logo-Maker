"use client"

import { UserDetailContext } from '@/app/_context/UserDetailContext'
import React, { useContext } from 'react'

function Info() {
    const {userDetail,setUserDetails} = useContext(UserDetailContext)
  return (
    <div>
      <div>
        <h2>Hello {userDetail?.name}</h2>
      </div>
    </div>
  )
}

export default Info
