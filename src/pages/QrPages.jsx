import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import TitlePage from "../components/TitlePage.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faGear, faQrcode, faRefresh, faUser} from "@fortawesome/free-solid-svg-icons";
import ListBoxClass from "../components/ListBoxClass.jsx";
import Select from "../components/Select.jsx";
import Header from "../components/Header.jsx";
import useClassStore from "../store/ClassStore.js";
import axios from "../axios/axios.js";

const QrPages = () => {
    const {classes} = useClassStore()
    const [major, setMajor] = useState(new Set())
    const [grades, setGrades] = useState(['X', 'XI', 'XII'])
    const [progress, setProgress] = useState(0)
    const [disbleButton, setDisableButton] = useState(true)
    const [disbleButton2, setDisableButton2] = useState(true)
    const [loadingGenerate, setLoadingGenerate] = useState(false)
    const [loadingDownload, setLoadingDownload] = useState(false)
    const [classAndMajor, setClassAndMajor] = useState({
        grade: '',
        major: ''
    })

    const handleClassSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                grade: option
            }
        })
    }

    const removeSymbol = (string) => {
        return string.replace(/_/g, ' ')
    }

    const handleMajorSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                major: option
            }
        })
    }

    const handleGenerateQr = () => {
        setDisableButton(false)
        setLoadingGenerate(true);
        const loadingProgress = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress + 1;
                if (newProgress === 100) {
                    setLoadingGenerate(false);
                    clearInterval(loadingProgress);
                }
                return newProgress;
            });
        }, 50);
        setProgress(0)
    };

    //TODO : bug double download qr
    const handleDownloadQr = async () => {
        try {
            setLoadingDownload(true)
            console.log(classAndMajor)
            const {grade, major} = classAndMajor
            const response = await axios(`qr/download/v2/${grade}/${major}`, {
                responseType: 'blob'
            })
            const blob = new Blob([response.data], {type: 'application/zip'})
            const url = window.URL.createObjectURL(blob)
            console.log(url)
            const link = document.getElementById('donwload')
            link.href = url
            link.setAttribute('download', `${grade}_${major}.zip`)
            link.click()
            setDisableButton2(true)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingDownload(false)
        }
    }

    useEffect(() => {
        const grades = ['X', 'XI', 'XII']
        const formatedData = new Set()

        grades.forEach(grade => {
            const filteredByGrade = classes.filter(item => item.grade === grade)
            filteredByGrade.forEach(item => {
                formatedData.add(removeSymbol(item.major))
            })
        })
        setMajor(formatedData);
    }, [classes])

    useEffect(() => {
        console.log(classAndMajor)
        if (classAndMajor.grade === '' || classAndMajor.major === '') {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [classAndMajor])

    useEffect(() => {
        if (progress === 100) {
            setLoadingGenerate(false);
            setDisableButton2(false)
        } else {
            setDisableButton2(true)
        }
    }, [progress]);

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
                            <Select title='Kelas' listOptions={grades} nameComponent={'Kelas'}
                                    onclick={handleClassSelect}/>
                            <Select title='Jurusan' listOptions={Array.from(major)} nameComponent={'Jurusan'}
                                    onclick={handleMajorSelect}/>
                            <button className={`w-full h-12 bg-teal-900 text-white rounded-md
                                ${disbleButton ? 'cursor-not-allowed opacity-20' : 'cursor-pointer opacity-100'}
                            `}
                                    onClick={() => handleGenerateQr()} disabled={disbleButton}>Buat Kode Qr
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='w-full bg-white rounded-xl p-5'>
                            <progress
                                className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400"
                                value={progress}
                                max={100}>{progress}%
                            </progress>
                            <div className='w-full h-80 bg-neutral-200 rounded-xl mt-5 grid place-items-center'>
                                <div className='w-72 h-72 bg-white rounded-xl p-5 grid place-items-center'>
                                    {loadingGenerate || loadingDownload ? (
                                        <FontAwesomeIcon icon={faRefresh}
                                                         className='text-9xl text-teal-900 animate-spin'/>
                                    ) : (
                                        <FontAwesomeIcon icon={faQrcode} className='text-9xl text-teal-900'/>
                                    )}
                                </div>
                            </div>
                            <a id={'donwload'}></a>
                            <button onClick={() => handleDownloadQr()}
                                    disabled={disbleButton2}
                                    className={`w-full h-12 bg-teal-900 text-white rounded-md mt-5
                                        ${disbleButton2 ? 'cursor-not-allowed opacity-20' : 'cursor-pointer opacity-100'}
                                    `}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QrPages