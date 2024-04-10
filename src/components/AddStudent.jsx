import React, {useEffect, useState} from "react";
import useStudentsStore from "../store/StudentsStore.js";
import axios from "../axios/axios.js";
import Alert from "./Alert.jsx";
import {faAdd, faCheck, faX, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddStudent = ({classGrade}) => {
    const [maxDate, setMaxDate] = useState(new Date().toISOString().split('T')[0])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertProps, setAlertProps] = useState({
        message: '',
        icon: '',
        trueOrFalse: false
    })
    const [formStudents, setFormStudent] = useState({
        nisn: '',
        name: '',
        dateOfBirth: '',
        image: null,
        classGrade: classGrade,
        status: 0
    })
    const {postStudent, addNewStudent} = useStudentsStore()

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleInputFile = async (e) => {
        const file = e.target.files[0]
        try {
            const form = new FormData();
            form.append('file', file)
            const base64 = await convertToBase64(file)
            setImage(prevState => base64)
        } catch (e) {
            console.log(e)
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        if(name === 'nisn' && !/^\d+$/.test(value)) {
            return
        }

        if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
            return
        }

        setFormStudent(prevState => ({...prevState, [name]: value}))
    }

    const handleInputDate = (e) => {
        const {value} = e.target
        const dateFormatted = formatDate(new Date(value))
        setFormStudent(prevState => ({...prevState, dateOfBirth: dateFormatted}))
    }

    const uploadImageAndStudentToDatabase = async (file) => {
        const form = new FormData();
        form.append('file', file)
        try {
            setLoading(true)
            const response = await axios.post('image/uploud', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            await postDataToDatabase(response.data.data.id)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const deleteImage = async (id) => {
        return await axios.delete(`image/delete/${id}`)
    }

    const createNewStudent = async (formStudents, imageId) => {
        return await postStudent({...formStudents, image: imageId})
    }

    const handleSuccess = () => {
        setAlertProps(prevState => ({
            ...prevState,
            message: 'Berhasil',
            icon: faCheck,
            trueOrFalse: true
        }))
        switchShowAlert()
    }

    const handleError = () => {
        setAlertProps(prevState => ({
            ...prevState,
            message: 'Gagal',
            icon: faX,
            trueOrFalse: false
        }))
        switchShowAlert()
    }

    const postDataToDatabase = async (imageId) => {
        if(formStudents.nisn === '' || formStudents.name === '') {
            setAlertProps(prevState => ({
                ...prevState,
                message: 'Data Tidak Boleh Kosong',
                icon: faX,
                trueOrFalse: false
            }))
            switchShowAlert()
            return
        }

        try {
            setLoading(true)
            const responseDataStudent = await createNewStudent(formStudents, imageId)
            addNewStudent(responseDataStudent)
            handleSuccess()
        } catch (e) {
            handleError()
            await deleteImage(imageId)
            console.log(e)
        } finally {
            setLoading(false)
            // setImage('')
            setFormStudent({
                nisn: '',
                name: '',
                image: null,
                classGrade: classGrade,
                status: 0
            })
        }
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();

        // Pad with leading zero if needed
        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }

        return `${day}-${month}-${year}`;
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const file = e.target[3].files[0]
            const typeAcc = file?.type.replace('/', ' ').split(' ')
            if (typeAcc[0] !== 'image') {
                setAlertProps(prevState => ({
                    ...prevState,
                    message: 'File Harus Berupa Gambar',
                    icon: faX,
                    trueOrFalse: false
                }))
                switchShowAlert()
                return
            }
            const response = await uploadImageAndStudentToDatabase(file)
            if (response.code === 'ERR_BAD_REQUEST') {
                setAlertProps(prevState => ({
                    ...prevState,
                    message: 'Gagal Tambah Siswa',
                    icon: faX,
                    trueOrFalse: false
                }))
                switchShowAlert()
            }
        } catch (error) {
            setAlertProps(prevState => ({
                ...prevState,
                message: 'Gagal Tambah Siswa',
                icon: faX,
                trueOrFalse: false
            }))
            switchShowAlert()
        }
    }

    const switchShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }

    return (
        <div className='w-full h-fit bg-white shadow-md rounded-md p-3 relative'>
            {showAlert && (
                <div className='absolute bg-white z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Alert message={alertProps.message} icon={alertProps.icon} trueOrFalse={alertProps.trueOrFalse}/>
                </div>
            )}
            <h1 className='text-2xl p-2 rounded-md bg-primary font-bold text-white w-fit'>Tambah Siswa</h1>
            <div className='mt-10'>
                <form method='POST' encType='multipart/form-data' onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label className='block text-primary font-semibold mt-4' htmlFor="nisn">
                            Nisn Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="text"
                            name='nisn'
                            id='nisn'
                            maxLength={10}
                            value={formStudents.nisn}
                            placeholder='Masukkan Nisn Siswa'
                            required={true}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="name">
                            Nama Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="text"
                            name='name'
                            id='name'
                            value={formStudents.name}
                            placeholder='Masukkan Nama Siswa'
                            required={true}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="dateOfBirth">
                            Tanggal Lahir Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="date"
                            name='dateOfBirth'
                            id='dateOfBirth'
                            pattern="\d{4}-\d{2}-\d{2}"
                            max={maxDate}
                            required={true}
                            onChange={(e) => handleInputDate(e)}
                        />
                    </div>
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="name">
                            Gambar Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="file"
                            name='file'
                            id='file'
                            required={true}
                            onChange={(e) => handleInputFile(e)}
                        />
                    </div>
                    <div className='w-full mt-8 grid place-items-center'>
                        <div
                            className='w-11/12 border-dashed h-[330px] border-2 p-3 overflow-hidden rounded-xl grid place-items-center'>
                            {image === '' ? (
                                <h1 className='text-5xl font-bold opacity-20'>No File Chosen</h1>
                            ) : (
                                <img src={image} alt="" width={200} height={300}
                                     className='rounded-md h-full'/>
                            )}
                        </div>
                    </div>
                    <button
                        className='w-full mt-12 h-14 bg-teal-900 rounded-md text-white font-semibold'>
                        {loading ? (
                            <FontAwesomeIcon icon={faRefresh} className='text-2xl animate-spin'/>
                        ) : (
                            <p>Kirim</p>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default AddStudent;