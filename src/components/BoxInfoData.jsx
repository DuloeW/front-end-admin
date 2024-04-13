import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const BoxInfoData = ({title, data, icon}) => {
    return (
        <div className='w-full lg:w-full h-28 p-5 bg-primary flex items-center gap-5 text-white rounded-xl'>
            <FontAwesomeIcon icon={icon} className='text-6xl'/>
            <div>
                <h2 className='font-extrabold text-lg lg:text-2xl'>{title}</h2>
                <p className='font-extralight'>{data}</p>
            </div>
        </div>
    )
}

export default BoxInfoData