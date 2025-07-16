"use client"

import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
function Hero() {
    const[logoTitle,setLogoTitle] = useState();
  return (
    <div className='flex items-center mt-24 flex-col gap-5'>
      <h2 className='text-[#E32935] text-5xl text-center font-bold'>{Lookup.HeroHeading}</h2>
      <h2 className='text-5xl text-center font-bold'>{Lookup.HeroSubheading}</h2>
      <p className='text-gray-500 text-lg text-center font-bold'>{Lookup.HeroDesc}</p>

      <div className='flex gap-6 w-full max-w-2xl mt-10'>
        <input type="text" placeholder={Lookup.TitlePlaceHolder}
        className='p-3 border rounded-md w-full shadow-md'
        onChange={(event)=>setLogoTitle(event?.target.value)}
        />
        <Link href={'/create?title='+logoTitle}>
            <Button className='bg-[#E32935] text-white p-6 rounded-md shadow-md hover:bg-red-600 transition-all duration-200'>
                Generate Logo
            </Button>
        </Link>
        
      </div>
    </div>
  )
}

export default Hero
