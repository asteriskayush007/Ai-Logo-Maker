"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
function Header() {
  const {user} = useUser();
  return (
    <div className='px-20 p-4 lg:px-32 xl:px-48  2xl:px-56 flex justify-between items-center shadow-sm'>
      <Image src={'/logo.svg'} alt="logo" height={100} width={180}></Image>

      <div className='flex gap-3 items-center'>
        {user? <Button>DashBoard</Button>:
        <Button>Get Started</Button>}
        <UserButton/>
      </div>
      
    </div>
  )
}

export default Header
