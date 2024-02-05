import React, {useState} from 'react'
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

const StudentsPages = () => {

    const [showOptions, setShowOptions] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const switchShowOptions = () => {
        setShowOptions(prevState => !prevState)
    }

    const switchShowSearch = () => {
        setShowSearch(prevState => !prevState)
    }

    const closeShowOptions = (type) => {
        setShowOptions(false)
        if (type === 'search') switchShowSearch()
    }

    const closeShowSearch = () => {
        setShowSearch(false)
    }

    return (
        <div className='w-full h-fit bg-neutral-200 flex'>
            <Sidebar/>
            <div className='w-11/12 h-fit p-5'>
                <Header title={'Data Siswa'} urLTitle={'pages/students'}/>
                <div className='w-full h-80 bg-white flex flex-col justify-between rounded-xl p-5 mt-10'>
                    <div className='w-full flex justify-between'>
                        <div>
                            <h1 className='text-xl font-semibold'>Daftar Kelas</h1>
                            <p className='text-xs tracking-widest'>Silahkan Pilih Kelas</p>
                        </div>
                        <div
                            className='flex items-center gap-3 p-2 rounded-md bg-red-700 text-white font-bold cursor-pointer'>
                            <FontAwesomeIcon icon={faAdd}/>
                            <h1>Tambah Kelas</h1>
                        </div>
                    </div>
                    <div>
                        <ListBoxClass/>
                    </div>
                    <div className='border-b-2 w-fit'>
                        <h1 className='text-lg font-semibold'>Tanggal Absen</h1>
                        <input className='border-none outline-none'
                            type="date"
                            name="ka"
                            id="ss"/>
                    </div>
                </div>

                <div className='mt-14'>
                    <div className='relative'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         className='absolute opacity-25 left-3 inset-y-1/2 -translate-y-1/2'/>
                        <input
                            className='w-80 h-10 p-2 pl-12 rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="search"
                            name=""
                            placeholder='Cari Nama Siswa'/>
                    </div>
                </div>
                <div className='w-full h-fit mt-5 bg-white p-3 rounded-xl relative'>
                    <div className='w-full flex justify-between'>
                        <div className='flex gap-10'>
                            <div>
                                <h1 className='text-xl font-semibold'>Absen Siswa</h1>
                                <p>Hari Ini</p>
                            </div>
                            <div
                                className='flex items-center cursor-pointer gap-3 px-2 rounded-md text-white text-sm bg-teal-900'>
                                <FontAwesomeIcon icon={faRefresh}/>
                                <h1>Muat Ulang</h1>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 relative'>
                            <h1 className='text-xl font-semibold text-teal-900'>XII Rekayasa Perangkat Lunak</h1>
                        </div>
                    </div>
                    <div className='w-full overflow-y-auto mt-10'>
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsPages