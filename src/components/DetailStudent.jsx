import React, {useEffect, useState} from "react";
import useClassStore from "../store/ClassStore.js";
import TextDetail from "./TextDetail.jsx";
import axios from "../axios/axios.js";
import Alert from "./Alert.jsx";
import {faCheck, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import DecisionAlert from "./DecisionAlert.jsx";
import {goToLoginPage} from "../util/Method.js";


const DetailStudent = ({student, refresh}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [name, setName] = useState(student?.name)
    const [showDecision, setShowDecision] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        icon: '',
        trueOrFalse: false
    })
    const [major, setMajor] = useState(student?.classGrade?.major)
    const [grade, setGrade] = useState(student?.classGrade?.grade)
    const {classes} = useClassStore()

    const changeToUpdate = () => {
        setIsUpdate(true)
    }

    const changeToCloseUpdate = () => {
        closeDecision()
        setIsUpdate(false)
    }

    const handleGetValue = (value) => {
        switch (value.id) {
            case 1:
                setName(value.name)
                break;
            case 2:
                setGrade(value.grade)
                break;
            case 3:
                const major = value.major?.replace(/ /g, '_')
                setMajor(major)
                break;
            default:
                break;
        }
    }

    const getClassId = (grade, major, classArr) => {
        return classArr?.find(item => item.grade === grade && item.major === major)?.id
    }

    const updateImage = async (file) => {
        const form = new FormData()
        form.append('file', file)
        try {
            const {id} = student.image
            return await axios.put(`image/update/${id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            return error
        }
    }

    const updateStudent = async () => {
        try {
            const classId = getClassId(grade, major, classes)
            const form = {
                ...student,
                name: name === undefined ? student.name : name,
                classGrade: {
                    id: classId
                },
                absensi: student.absensi
            }
            return await axios.put('/students/update', form)
        } catch (error) {
            return error
        }
    }

    const nonActivedStudent = async() => {
        closeDecision()
        try {

            const form = {
                ...student,
                status: 1
            }
            const response =  await axios.put('/students/update', form)
            sendRequestRefresh()
            setIsUpdate(false)
            showAlert('Berhasil Nonaktifkan Siswa', faCheck, true)
            setTimeout(() => {
                dontShowAlert()
                changeToCloseUpdate()
            }, 1000)
        } catch (error) {
            console.log(error)
            showAlert('Gagal Nonaktifkan Siswa', faThumbsDown, false)
            if(error.code === 'ERR_BAD_REQUEST') {
                goToLoginPage()
            }
            setTimeout(() => {
                dontShowAlert()
                changeToCloseUpdate()
            }, 1000)
        }
    }

    const showAlert = (message, icon, trueOrFalse) => {
        setAlert({
            show: true,
            message: message,
            icon: icon,
            trueOrFalse: trueOrFalse
        })
    }

    const   sendRequestRefresh = () => {
        refresh(true)
    }

    const dontShowAlert = () => {
        setAlert({
            show: false,
            message: '',
            icon: '',
            trueOrFalse: false
        })
    }

    const updateDataStudent = async (e) => {
        e.preventDefault()
        const file = e.target[4].files[0]
        const typeAcc = file?.type.replace('/', ' ').split(' ')
        try {
            setLoading(true)
            if(file === undefined) {
                try {
                    const response = await updateStudent()
                    console.log(response)
                    if (response.code === 'ERR_BAD_REQUEST') {
                        showAlert('Gagal Update Data', faThumbsDown, false)
                        setTimeout(() => {
                            dontShowAlert()
                        }, 1000)
                        return
                    }
                    showAlert('Berhasil Update Data', faCheck, true)
                    setTimeout(() => {
                        dontShowAlert()
                        changeToCloseUpdate()
                    }, 1000)
                    return
                }catch (error)  {
                    console.log(error)
                    showAlert('Gagal Update Data', faThumbsDown, false)
                    setTimeout(() => {
                        dontShowAlert()
                    }, 1000)
                    return
                }
            } else if (typeAcc[0] !== 'image') {
                showAlert('File Harus Berupa Gambar', faThumbsDown, false)
                setTimeout(() => {
                    dontShowAlert()
                }, 1000)
                return
            }
            await Promise.all([updateImage(file), updateStudent()]);
            showAlert('Berhasil Update Data', faCheck, true)
            setTimeout(() => {
                dontShowAlert()
                changeToCloseUpdate()
            }, 1000)
        } catch (error) {
            console.log(error)
            showAlert('Gagal Update Data', faThumbsDown, false)
            setTimeout(() => {
                dontShowAlert()
            }, 1000)
        } finally {
            setLoading(false)
            sendRequestRefresh()
        }
    }

    const openDecision = () => {
        setShowDecision(true)
    }

    const closeDecision = () => {
        setShowDecision(false)
    }

    useEffect(() => {
        setName(student?.name)
        setGrade(student?.classGrade?.grade)
        setMajor(student?.classGrade?.major)
    }, [student]);

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
                <div className='w-full flex flex-col gap-5 relative'>
                    <form method='POST' encType='multipart/form-data' onSubmit={(e) => updateDataStudent(e)}>
                        {alert.show && (
                            <div className='w-fit h-fit absolute left-2/4 -translate-x-2/4 z-50'>
                                <Alert message={alert.message} icon={alert.icon} trueOrFalse={alert.trueOrFalse}/>
                            </div>
                        )}
                        <TextDetail title='Nisn' value={student?.nisn}/>
                        <TextDetail title='Nama' value={student?.name} update={isUpdate} valueSent={handleGetValue}/>
                        <TextDetail title='Kelas' value={student?.classGrade?.grade} update={isUpdate}
                                    valueSent={handleGetValue}/>
                        <TextDetail title='Jurusan' value={student?.classGrade?.major} update={isUpdate}
                                    valueSent={handleGetValue}/>
                        {isUpdate && (
                            <>
                                <input type='file'
                                       className='w-full mt-4 p-2 rounded-md bg-white shadow-md border-2 border-dashed'/>
                                {showDecision && (
                                    <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4'>
                                        <DecisionAlert
                                            message="Apakah Kamu Yakin Menonaktifkan Siswa Ini?"
                                            decision={(userDecision) => {
                                                if (userDecision) {
                                                    // User clicked "Yes"
                                                    console.log(userDecision)
                                                    nonActivedStudent()
                                                } else {
                                                    // User clicked "No"
                                                    console.log(userDecision)
                                                    closeDecision()
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                                <p className='mt-3 text-red-800 text-xs cursor-pointer underline'
                                    onClick={() => openDecision()}
                                >Nonaktifkan Siswa</p>
                                <div className='w-full mt-4 flex gap-5'>
                                    <button className='px-10 py-2 bg-green-500 rounded-md text-white font-semibold'
                                            type='submit'
                                            disabled={showDecision}
                                    >Kirim
                                    </button>
                                    <button className='px-10 py-2 bg-red-800 rounded-md text-white font-semibold'
                                            onClick={() => changeToCloseUpdate()}
                                            disabled={showDecision}
                                    >Batal
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                    <button className={`mt-1 bg-teal-700 px-5 py-2 rounded-md text-white font-semibold border-none outline-none
                        ${isUpdate ? 'hidden' : ''}
                    `}
                            onClick={() => changeToUpdate()}
                    >Update
                    </button>
                </div>
            </div>
            <div className='mt-12 w-full h-1/2 relative'>
                <h1 className='text-primary text-3xl font-bold'>Absensi Siswa</h1>
                <div className='w-full flex flex-wrap gap-2 border-t-2 pt-2 mt-3 h-fit overflow-y-auto'>
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