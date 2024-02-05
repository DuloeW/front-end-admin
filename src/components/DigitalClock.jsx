import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
    const [dateNow, setDateNow] = useState({
        day: '',
        date: '',
        month: '',
        year: '',
        time: '',
    })

    const getMonthName = (month) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agus', 'Sep', 'Okt', 'Nov', 'Des'];
        return monthNames[month];
    };

    const getDayName = (day) => {
        const dayNames = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        return dayNames[day];
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            setDateNow(prev => ({
                ...prev,
                day: getDayName(currentDate.getDay()),
                date: currentDate.getDate(),
                month: getMonthName(currentDate.getMonth()),
                year: currentDate.getFullYear(),
                time: `${currentDate.getHours()} : ${currentDate.getMinutes()} : ${currentDate.getSeconds()}`,
            }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className='w-5/6 h-40 p-5 text-center grid place-items-center bg-white rounded-xl relative justify-self-start'>
            <div className='flex gap-1 absolute -top-5 left-12 text-2xl'>
                <p className='p-4 py-1 bg-white rounded-full shadow-xl font-bold tracking-wider'>{dateNow.month}</p>
                <p className='p-4 py-1 bg-white rounded-full shadow-xl font-bold tracking-wider'>{dateNow.day}</p>
                <p className='p-4 py-1 bg-white rounded-full shadow-xl font-bold tracking-wider'>{dateNow.date}</p>
                <p className='p-4 py-1 bg-white rounded-full shadow-xl font-bold tracking-wider'>{dateNow.year}</p>
            </div>
            {/*<div className='w-full h-40 absolute top-1/3 -right-8 bg-teal-900 rounded-2xl -z-10'></div>*/}
            <p className='text-6xl font-extrabold
            '>{dateNow.time}</p>
        </div>
    )
}

export default DigitalClock