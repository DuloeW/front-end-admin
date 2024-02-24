import { useState } from "react";

const BoxClass = ({ className, isActive, onClick, disable }) => {
    const handleClick = () => {
        onClick(className);
    };
    const removeSymbol = (string) => {
        return string.replace(/_/g, ' ')
    }

    const boxClass = `w-fit p-2 shadow-2xl cursor-pointer rounded-md transition-all 
                     ${isActive ? 'bg-white text-teal-900 pointer-events-none' : 'bg-teal-900 text-white'}`;

    return (
        <div onClick={handleClick} className={boxClass}>
            <p className='text-xs font-bold'>{className?.grade} {removeSymbol(className?.major)}</p>
        </div>
    );
};

export default BoxClass;
