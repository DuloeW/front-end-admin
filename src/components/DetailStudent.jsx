import bayu from "../assets/bayu.jpg";
import React from "react";

const DetailStudent = () => {
    return (
        <div className='w-full bg-white shadow-md rounded-md p-3'>
            <div className='flex gap-5 w-full h-fit'>
                <img src={bayu} alt="" width={200} height={200} className='rounded-md'/>
                <div className='w-full flex flex-col gap-5'>
                    <div className='w-full'>
                        <h2>Nisn</h2>
                        <div className='p-2 bg-white shadow-md rounded-md'>
                            <p>9887872632</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h2>Nama</h2>
                        <div className='p-2 bg-white shadow-md rounded-md'>
                            <p>Jhone Done</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h2>Kelas</h2>
                        <div className='p-2 bg-white shadow-md rounded-md'>
                            <p>X</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h2>Jurusan</h2>
                        <div className='p-2 bg-white shadow-md rounded-md'>
                            <p>Rekayaa Perangkat Lunak</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <h1 className='text-primary text-2xl font-bold'>Absensi Siswa</h1>
                <div className='w-full flex flex-wrap gap-5 mt-3 h-fit'>
                    <div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                        <p>23-10-2024</p>
                        <p>Hadir</p>
                    </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div><div className='p-3 w-fit text-center font-semibold rounded-md bg-white shadow-md'>
                    <p>23-10-2024</p>
                    <p>Hadir</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DetailStudent;