import React from 'react'

function HeadingDesc({title,description}) {
  return (
    <div>
      <h2 className='text-[#E32935] text-3xl font-bold'>{title}</h2>
      <p className='text-gray-500 text-lg font-bold mt-2'>{description}</p>
    </div>
  )
}

export default HeadingDesc
