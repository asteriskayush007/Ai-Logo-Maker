"use client"

import React, { useState } from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

function LogoTitle({onHandleInputChange}) {
    const searchParam = useSearchParams();

    const [title,setTitle] = useState(searchParam?.get('title')??'')


  return (
    <div className='my-10'>
      <HeadingDesc 
      title={Lookup?.LogoTitle}
      description={Lookup.LogoTitleDesc}
      />
        <input type="text" placeholder={Lookup.TitlePlaceHolder}
            className='p-4 border rounded-md w-full shadow-md mt-5'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              onHandleInputChange(e.target.value);
            }}
        />
    </div>
  )
}

export default LogoTitle
