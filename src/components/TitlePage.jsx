import React from 'react'

const TitlePage = ({urlTitle, title}) => {
    return (
        <div className='font-extrabold'>
            <p className='text-[#101D49] text-xs opacity-60'>{urlTitle}</p>
            <h1 className='text-[#101D49] text-3xl'>{title}</h1>
        </div>
    )
}

export default TitlePage