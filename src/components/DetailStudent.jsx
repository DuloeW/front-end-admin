import bayu from "../assets/bayu.jpg";
import React, {useEffect, useState} from "react";
import useClassStore from "../store/ClassStore.js";
import Select from "./Select.jsx";
import TextDetail from "./TextDetail.jsx";

const DetailStudent = ({student}) => {
    const [isUpdate, setIsUpdate] = useState(false)

    const changeToUpdate = () => {
        setIsUpdate(true)
    }

    const changeToCloseUpdate = () => {
        setIsUpdate(false)
    }

    return (
        <div className='w-full bg-white shadow-md rounded-md p-3'>
            <div className='flex flex-col gap-5 w-full h-fit'>
                <div className='w-full h-full grid place-items-center'>
                    <div style={{backgroundImage: `url(data:image/png;base64,${student?.image?.file})`}} className='rounded-md w-48
                        h-48 flex justify-center items-center -rotate-90 bg-no-repeat bg-cover bg-center'>
                        {!student.hasOwnProperty(`image`) && (
                            <p className='text-center rotate-90 text-lg font-bold text-primary opacity-40'>Pilih Siswa
                                Terlebih Dahulu</p>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <TextDetail title='Nisn' value={student?.nisn}/>
                    <TextDetail title='Nama' value={student?.name} update={isUpdate}/>
                    <TextDetail title='Kelas' value={student?.classGrade?.grade} update={isUpdate}/>
                    <TextDetail title='Jurusan' value={student?.classGrade?.major} update={isUpdate}/>
                    {isUpdate && (
                        <div className='w-full flex gap-5'>
                            <button className='px-10 py-2 bg-green-500 rounded-md text-white font-semibold'>Kirim</button>
                            <button className='px-10 py-2 bg-red-800 rounded-md text-white font-semibold'
                                onClick={() => changeToCloseUpdate()}
                            >Batal</button>
                        </div>
                    )}
                    <button className={`mt-1 bg-teal-700 px-5 py-2 rounded-md text-white font-semibold border-none outline-none
                        ${isUpdate ? 'hidden' : ''}
                    `}
                        onClick={() => changeToUpdate()}
                    >Update</button>
                </div>
            </div>
            <div className='mt-12 w-full h-1/2 relative'>
                <h1 className='text-primary text-3xl font-bold'>Absensi Siswa</h1>
                <div className='w-full flex flex-wrap gap-2 border-t-2 pt-2 mt-3 h-fit'>
                    {student?.absensi?.map((absen) => (
                        <div key={absen.id} className='p-3 w-fit font-semibold rounded-md bg-white shadow-md'>
                            <div className='flex gap-5'>
                                <p>{absen.date}</p>
                                <p>{absen.time} WITA</p>
                            </div>
                            <p className='text-lg font-bold'>{absen.status}</p>
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