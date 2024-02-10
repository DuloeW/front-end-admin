import bayu from "../assets/bayu.jpg";
import React from "react";

const TextDetail = ({title, value, removeSymbol = function (){}}) => {
    return (
        <div className='w-full'>
            <h2>{title}</h2>
            <div className='p-2 bg-white shadow-md rounded-md'>
                {title === 'Jurusan' ? (
                    <p>{removeSymbol(value)}</p>
                ) : (
                    <p>{value}</p>
                )}
            </div>
        </div>
    )
}

const DetailStudent = ({student}) => {
    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }
    return (
        <div className='w-full bg-white shadow-md rounded-md p-3'>
            <div className='flex gap-5 w-full h-fit'>
                <div style={{backgroundImage: `url(data:image/png;base64,${student?.image?.file})`}} className='rounded-md w-full h-72 flex justify-center items-center -rotate-90 bg-no-repeat bg-cover bg-center'>
                    {!student.hasOwnProperty(`image`) && (
                        <p className='text-center rotate-90 text-lg font-bold text-primary opacity-40'>Pilih Siswa
                            Terlebih Dahulu</p>
                    )}
                </div>
                <div className='w-full flex flex-col gap-5'>
                <TextDetail title='Nisn' value={student?.nisn}/>
                    <TextDetail title='Nama' value={student?.name}/>
                    <TextDetail title='Kelas' value={student?.classGrade?.grade}/>
                    <TextDetail title='Jurusan' value={student?.classGrade?.major} removeSymbol={removeSymbol}/>
                </div>
            </div>
            <div className='mt-12 w-full h-1/2 relative'>
                <h1 className='text-primary text-5xl font-bold'>Absensi Siswa</h1>
                <div className='w-full flex flex-wrap gap-5 border-t-2 pt-2 mt-3 h-fit'>
                    {student?.absensi?.map((absen) => (
                        <div key={absen.id} className='p-3 w-fit font-semibold rounded-md bg-white shadow-md'>
                            <div className='flex gap-5'>
                                <p>{absen.date}</p>
                                <p>{absen.time} WITA</p>
                            </div>
                            <p className='text-xl font-bold'>{absen.status}</p>
                        </div>
                    ))}
                    {student?.absensi?.length === 0 && (
                        <p className='text-primary text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold opacity-40 text-center w-full'>
                            Absensi Tidak Ada
                        </p>
                    )}
                    {!student.hasOwnProperty('id') && (
                        <p className='text-primary text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold opacity-40 text-center w-full'>
                            Pilih Siswa Terlebih Dahulu
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailStudent;