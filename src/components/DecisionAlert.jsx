import React from 'react';

const DecisionAlert = ({ message, decision }) => {
    const handleYes = () => {
        decision(true);
    }

    const handleNo = () => {
        decision(false);
    }

    return (
        <div className="p-5 bg-white text-neutral-700 font-semibold text-lg shadow-2xl rounded-md mb-4">
            <p>{message}</p>
            <div className='flex w-full justify-center mt-5'>
                <button type='button' className="mr-4 text-white bg-green-500 px-4 py-2 rounded-md cursor-pointer transition duration-300 ease-in-out" onClick={handleYes}>Yes</button>
                <button type='button' className="text-white bg-red-800 px-4 py-2 rounded-md cursor-pointer transition duration-300 ease-in-out" onClick={handleNo}>No</button>
            </div>
        </div>
    );
}

export default DecisionAlert;