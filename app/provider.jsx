import React from 'react'
import Header from './_components/Header'

function Provider({children}) {
  return (
    <div>
        <Header/>
        <div className='px-20 p-4 lg:px-32 xl:px-48  2xl:px-56'>
            {children}
        </div>
        
    </div>
  )
}

export default Provider
