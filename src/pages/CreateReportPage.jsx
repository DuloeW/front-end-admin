import Sidebar from "../components/Sidebar.jsx";
import TitlePage from "../components/TitlePage.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGear,
    faNoteSticky,
    faQrcode,
    faRefresh,
    faStickyNote,
    faTruckLoading,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Select from "../components/Select.jsx";
import {faItunesNote} from "@fortawesome/free-brands-svg-icons";
import Header from "../components/Header.jsx";

const listOptions = ['X', 'XI', 'XII']
const listOptions2 = ['Rekayasa Perangkat Lunak', 'Tataboga', 'Teknik Komputer dan Jaringan', 'Multimedia', 'Teknik Elektronika Industri', 'Teknik Kendaraan Ringan', 'Teknik Sepeda Motor', 'Teknik Pemesinan']
const CreateReportPage = () => {
    return (
        <div className='w-full h-screen flex bg-neutral-200'>
            <Sidebar/>
            <div className='w-11/12 p-5 h-fit'>
                <Header title={'Cetak Laporan'} urLTitle={'pages/report'}/>
                <div className='w-full grid grid-cols-2 grid-rows-1 gap-6 rounded-xl mt-10'>
                    <div className='w-full p-5 rounded-xl bg-white h-fit'>
                        <div>
                            <h1 className='text-3xl font-bold'>Silahkan Pilih Kelas</h1>
                            {/*<p className='text-xs tracking-widest'>Silahkan Pilih Kelas</p>*/}
                        </div>
                        <div className='flex flex-col gap-5 mt-5'>
                            <input type={"date"} className='w-full h-12 bg-white rounded-md shadow-md px-3 outline-none border-neutral-300' placeholder={'Tanggal'}/>
                            <Select title='Kelas' listOptions={listOptions} nameComponent={'Kelas'}/>
                            <Select title='Jurusan' listOptions={listOptions2} nameComponent={'Jurusan'}/>
                            <button className='w-full h-12 bg-teal-900 text-white rounded-md'>Buat Laporan</button>
                        </div>
                    </div>
                    <div>
                        <div className='w-full bg-white rounded-xl p-5'>
                            <div className='w-full h-80 bg-neutral-200 rounded-xl mt-5 grid place-items-center'>
                                <div className='w-72 h-72 bg-white rounded-xl p-5 grid place-items-center'>
                                    <FontAwesomeIcon icon={faStickyNote} className='text-9xl text-teal-900'/>
                                </div>
                            </div>
                            <button
                                    className='w-full h-12 bg-teal-900 text-white rounded-md mt-5'>Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateReportPage