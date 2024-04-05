import Table from "./Table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import bayu from "../assets/bayu.jpg";
import AddStudent from "./AddStudent.jsx";
import DetailStudent from "./DetailStudent.jsx";
import '../assets/css/Custom.css'
import useStudentsStore from "../store/StudentsStore.js";
import useClassStore from "../store/ClassStore.js";

const DetailClass = ({onclick, data}) => {
    const [showDetail, setShowDetail] = useState(false)
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})
    const {
        getClassById,
        setStudentsClassSelected,
        lengthStudentsOfClassSelected,
        setLengthStudentsOfClassSelected
    } = useClassStore()

    const {students, getAllStudents} = useStudentsStore()

    const handleOnclick = () => {
        onclick(false)
    }

    const openShowDetail = () => {
        setShowDetail(true)
    }

    const closeShowDetail = () => {
        setShowDetail(false)
    }

    const handleSelectedStudent = (student) => {
        setSelectedStudent(student)
    }

    const handleSearch = async (e) => {
        let name = e.target.value
        if(name !== '') {
            const filteredStudents = data?.students?.filter(student => {
                return student.name.toLowerCase().includes(name.toLowerCase());
            });
            setStudentsClassSelected(filteredStudents)
        } else {
            await getClassById(data.id)
        }
    }

    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }

    const handleGetRefresh = (value) => {
        setRefreshPage(value)
        setTimeout(() => {
            setRefreshPage(false)
        },100)
    }

    useEffect(() => {
        const studentsLength = setLengthStudentsOfClassSelected(data.id)
        const classById =  getClassById(data.id)
        Promise.all([studentsLength, classById, getAllStudents()])
        // getClassById(data.id)
    }, [students.length])

    useEffect(() => {
        if(refreshPage) {
            Promise.all([getClassById(data.id),
                setLengthStudentsOfClassSelected(data.id),
                getAllStudents()])
        }
    }, [refreshPage]);



    return (
        <>
            <div className='absolute -top-16 right-0 z-50 '>
                <FontAwesomeIcon icon={faUser} onClick={() => openShowDetail()} className='text-2xl p-2 bg-primary cursor-pointer rounded-md text-white m-8'/>
                <FontAwesomeIcon icon={faAdd} onClick={() => closeShowDetail()} className='text-2xl p-2 bg-primary cursor-pointer rounded-md text-white m-8'/>
            </div>
            <div
                className='w-full h-full flex flex-col lg:flex-row gap-10 p-8 overflow-x-hidden z-50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl'>
                <div className='w-fit h-fit p-2 shadow-md'>
                    <h1 className='text-2xl font-bold text-primary'>{data.grade} {removeSymbol(data.major)}</h1>
                    <p>Jumlah Siswa {lengthStudentsOfClassSelected}</p>
                    <div className='mt-12'>
                        <div className='relative mt-2'>
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                             className='absolute opacity-25 left-3 inset-y-1/2 -translate-y-1/2'/>
                            <input
                                className='w-80 h-10 p-2 pl-12 rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                                type="search"
                                name=""
                                placeholder='Cari Nama Siswa'
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>

                        <div className='w-full h-[450px] mt-4 px-1 relative border-t-2 py-5 overflow-y-auto'>
                            {data.students?.map((student) => (
                                <div key={student.id} onClick={() => handleSelectedStudent(student)}
                                     className={`list-students p-2 cursor-pointer rounded-md mb-3 duration-150 hover:bg-primary hover:text-white
                                        ${selectedStudent.id === student.id ? 'bg-primary text-white' : 'bg-white text-primary'}`
                                     }>
                                    <h1 className='font-bold'>{student.name}</h1>
                                </div>
                            ))}
                            {data.students?.length === 0 && (
                                <p className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-primary text-lg font-extrabold opacity-40 text-center'>
                                    Siswa Tidak Ada
                                </p>
                            )}
                        </div>
                        <button onClick={() => handleOnclick()}
                                className='w-full h-10 bg-red-900 rounded-md text-white font-semibold mt-4'>Keluar
                        </button>
                    </div>
                </div>
                {showDetail ? (
                    <DetailStudent student={selectedStudent} refresh={handleGetRefresh}/>
                ) : (
                    <AddStudent classGrade={data.id}/>
                )}
            </div>
        </>
    )
}

export default DetailClass