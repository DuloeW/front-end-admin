import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJs.register(ArcElement, Tooltip, Legend)

const PieChart = ({ data, labels }) => {
    return (
        <div className='w-full h-fit bg-white p-4 rounded-2xl'>
            <div>
                <h1 className='text-primary text-2xl font-extrabold'>Absensi Siswa Hari Ini</h1>
            </div>
            <div className='mt-2 flex justify-evenly'>
                <div className='w-48'>
                    <Pie data={data} />
                </div>
                <div className='flex flex-col gap-5 justify-center'>
                    {labels.map((label, index) => (
                        <div className='flex items-center'
                            key={index}>
                            <span className='inline-block rounded-full w-7 h-7 mr-2' style={{ backgroundColor: data?.datasets[0].backgroundColor[index] }}></span>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PieChart