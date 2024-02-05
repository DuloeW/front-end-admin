import { useState } from "react";

const BoxClass = ({ className, grade, isActive, onClick }) => {
    const handleClick = () => {
        onClick(className, grade);
    };

    const boxClass = `w-fit p-2 shadow-2xl cursor-pointer rounded-md transition-all 
                     ${isActive ? 'bg-white text-teal-900' : 'bg-teal-900 text-white'}`;

    return (
        <div onClick={handleClick} className={boxClass}>
            <p className='text-xs font-bold'>{grade} {className}</p>
        </div>
    );
};

export default BoxClass;
