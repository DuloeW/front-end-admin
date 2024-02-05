import Table from "./Table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import bayu from "../assets/bayu.jpg";
import AddStudent from "./AddStudent.jsx";
import DetailStudent from "./DetailStudent.jsx";


const students = [
    {"name": "John Doe"},
    {"name": "Alice Smith"},
    {"name": "Michael Johnson"},
    {"name": "Emily Davis"},
    {"name": "Daniel Brown"},
    {"name": "Jessica Martinez"},
    {"name": "David Anderson"},
    {"name": "Sarah Wilson"},
    {"name": "Matthew Taylor"},
    {"name": "Jennifer Thomas"},
    {"name": "Christopher Garcia"},
    {"name": "Lisa Rodriguez"},
    {"name": "James Lopez"},
    {"name": "Mary Perez"},
    {"name": "Robert Lee"},
    {"name": "Ashley Gonzales"},
    {"name": "William Harris"},
    {"name": "Jessica Clark"},
    {"name": "Brian Lewis"},
    {"name": "Elizabeth Walker"},
    {"name": "Joshua Hall"},
    {"name": "Megan Young"},
    {"name": "Kevin Allen"},
    {"name": "Amanda King"},
    {"name": "Ryan Hill"},
    {"name": "Nicole Baker"},
    {"name": "Eric Green"},
    {"name": "Samantha Adams"},
    {"name": "Tyler Wright"},
    {"name": "Amy Nelson"},
    {"name": "Andrew Martinez"},
    {"name": "Michelle Carter"},
    {"name": "Jason Moore"},
    {"name": "Stephanie Rivera"},
    {"name": "Jeffrey White"},
    {"name": "Kimberly Perez"},
    {"name": "Jonathan Martin"},
    {"name": "Melissa Thompson"},
    {"name": "Steven Scott"},
    {"name": "Laura Garcia"}
]

const DetailClass = ({onclick}) => {

    const [shwoDetail, setShowDetail] = useState(false)

    const handleOnclick = () => {
        onclick(false)
    }

    const openShowDetail = () => {
        setShowDetail(true)
    }

    const closeShowDetail = () => {
        setShowDetail(false)
    }


    return (
        <>
            <div className='absolute -top-16 right-0 z-50 '>
                <FontAwesomeIcon icon={faUser} onClick={() => openShowDetail()} className='text-2xl p-2 bg-teal-900 cursor-pointer rounded-md text-white m-8'/>
                <FontAwesomeIcon icon={faAdd} onClick={() => closeShowDetail()} className='text-2xl p-2 bg-teal-900 cursor-pointer rounded-md text-white m-8'/>
            </div>
            <div className='w-full h-full flex gap-10 p-8 overflow-x-hidden z-50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl'>
                <div className='w-fit p-2 shadow-md'>
                    <h1 className='text-2xl font-bold text-primary'>XII Rekayasa Perangkat Lunak</h1>
                    <p>Jumlah Siswa 38</p>
                    <div className='mt-12'>
                        <div className='relative mt-2'>
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                             className='absolute opacity-25 left-3 inset-y-1/2 -translate-y-1/2'/>
                            <input
                                className='w-80 h-10 p-2 pl-12 rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                                type="search"
                                name=""
                                placeholder='Cari Nama Siswa'/>
                        </div>

                        <div className='w-full h-[450px] mt-4 border-t-2 py-5 overflow-y-auto'>
                            {students.map((student, index) => (
                                <div key={index} className='p-2 bg-primary rounded-md mb-3'>
                                    <h1 className='text-white font-bold'>{student.name}</h1>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleOnclick()}
                            className='w-full h-10 bg-red-900 rounded-md text-white font-semibold mt-4'>Keluar</button>
                    </div>
                </div>
                {shwoDetail ? (
                    <DetailStudent/>
                ) : (
                    <AddStudent/>
                )}
            </div>
        </>
    )
}

export default DetailClass