import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import TitlePage from "../components/TitlePage.jsx";
import BoxClass from "../components/BoxClass.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAdd, faEllipsis,
    faGear,
    faMagnifyingGlass,
    faRefresh,
    faUser, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table.jsx";
import ListBoxClass from "../components/ListBoxClass.jsx";
import Header from "../components/Header.jsx";
import UpdateAbsensi from "../components/UpdateAbsensi.jsx";
import useClassStore from "../store/ClassStore.js";

const StudentsPages = () => {

    const [showUpdateAbsensi, setShowUpdateAbsensi] = useState(false)
    const [queryDate, setQueryDate] = useState(new Date().toISOString().split('T')[0])
    const {classSelectedInStudentsPages, getAllClasses} = useClassStore()
    const {grade, major} = classSelectedInStudentsPages
    const [keyword, setKeyword] = useState('')

    const openUpdateAbsensi = (open) => {
        setShowUpdateAbsensi(open)
    }

    const closeUpdateAbsensi = (close) => {
        setShowUpdateAbsensi(close)
    }

    const removeSymbol = (string) => {
        return string.replace(/_/g, ' ')
    }

    const handleDateChange = (e) => {
        setQueryDate(e.target.value)
        localStorage.setItem('date', e.target.value)
    }

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('date', new Date().toISOString().split('T')[0])
        setQueryDate(localStorage.getItem('date'))

    }, [])

    useEffect(() => {
        if (showUpdateAbsensi) {
            setKeyword('')
        }
    }, [showUpdateAbsensi])

    useEffect(() => {
        getAllClasses()
    }, [])


    return (
        <div className='w-full h-fit bg-neutral-200 flex flex-col md:flex-row'>
            <Sidebar/>
            <div className='w-full h-fit p-5 relative overflow-hidden'>
                {showUpdateAbsensi && (
                    <UpdateAbsensi onClick={closeUpdateAbsensi}/>
                )}
                <Header title={'Data Siswa'} urLTitle={'pages/students'}/>
                <div className='w-full h-fit lg:h-80 bg-white flex flex-col justify-between rounded-xl p-5 mt-10'>
                    <div>
                        <h1 className='text-xl font-semibold'>Daftar Kelas</h1>
                        <p className='text-xs tracking-widest'>Silahkan Pilih Kelas</p>
                    </div>
                    <div className='mt-3 lg:mt-0'>
                        <ListBoxClass queryDate={queryDate}/>
                    </div>
                    <div className='border-b-2 w-fit mt-2'>
                        <h1 className='text-lg font-semibold'>Tanggal Absen</h1>
                        <input className='border-none outline-none'
                               type="date"
                               name="ka"
                               id="ss"
                               value={queryDate}
                               onChange={(e) => handleDateChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-14 w-full'>
                    <div className='relative'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         className='absolute opacity-25 left-3 inset-y-1/2 -translate-y-1/2'/>
                        <input
                            className='w-full lg:w-80 h-10 p-2 pl-12 rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="search"
                            name='keyword'
                            value={keyword}
                            placeholder='Cari Nama Siswa'
                            onChange={(e) => handleGetKeyword(e)}
                        />
                    </div>
                </div>
                <div className='w-full h-[700px] overflow-y-auto mt-5 bg-white rounded-xl relative'>
                    <div className='w-full sticky top-0 bg-white p-3 flex justify-between'>
                        <div className='flex gap-10'>
                            <div>
                                <h1 className='text-xl font-semibold'>Absen Siswa</h1>
                                <p className="text-[10px] md:text-base">{queryDate}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 relative'>
                            <h1 className='text-xl font-semibold text-teal-900'>
                                {classSelectedInStudentsPages.grade === undefined ? 'Pilih Kelas' : `${grade}`.concat(' ').concat(removeSymbol(major))}
                            </h1>
                        </div>
                    </div>
                    <div className='w-full px-3 overflow-y-auto mt-3'>
                        <Table onClickOpen={openUpdateAbsensi} classStudentsPage={classSelectedInStudentsPages}
                               keyword={keyword}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsPages