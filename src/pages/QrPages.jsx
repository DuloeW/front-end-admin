import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import TitlePage from "../components/TitlePage.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faGear, faQrcode, faUser} from "@fortawesome/free-solid-svg-icons";
import ListBoxClass from "../components/ListBoxClass.jsx";
import Select from "../components/Select.jsx";
import Header from "../components/Header.jsx";

const listOptions = ['X', 'XI', 'XII']
const QrPages = () => {
    const [classAndMajor, setClassAndMajor] = useState({
        class: '',
        major: ''
    })

    const handleClassSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                class: option
            }
        })
    }

    const handleMajorSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                major: option
            }
        })
    }

    return (
        <div className='w-full h-screen flex bg-neutral-200'>
            <Sidebar/>
            <div className='w-11/12 h-fit p-5'>
                <Header title={'Buat Kode Qr'} urLTitle={'pages/qr'}/>
                <div className='w-full grid grid-cols-2 grid-rows-1 gap-6 rounded-xl mt-10'>
                    <div className='w-full p-5 rounded-xl bg-white h-fit'>
                        <div>
                            <h1 className='text-3xl font-bold'>Silahkan Pilih Kelas</h1>
                        </div>
                        <div className='flex flex-col gap-5 mt-5'>
                            <Select title='Kelas' listOptions={listOptions} nameComponent={'Kelas'} onclick={handleClassSelect}/>
                            <Select title='Jurusan' listOptions={listOptions2} nameComponent={'Jurusan'} onclick={handleMajorSelect}/>
                            <button className='w-full h-12 bg-teal-900 text-white rounded-md'>Buat Kode Qr</button>
                        </div>
                    </div>
                    <div>
                        <div className='w-full bg-white rounded-xl p-5'>
                            <div className='w-full h-80 bg-neutral-200 rounded-xl mt-5 grid place-items-center'>
                                <div className='w-72 h-72 bg-white rounded-xl p-5 grid place-items-center'>
                                    <FontAwesomeIcon icon={faQrcode} className='text-9xl text-teal-900'/>
                                </div>
                            </div>
                            <button disabled={true} className='w-full h-12 bg-teal-900 text-white rounded-md mt-5'>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QrPages