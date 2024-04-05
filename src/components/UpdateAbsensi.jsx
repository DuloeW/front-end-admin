import useStudentsStore from "../store/StudentsStore.js";
import useClassStore from "../store/ClassStore.js";
import {useEffect, useState} from "react";
import axios from "../axios/axios.js";

const UpdateAbsensi = ({onClick}) => {

    const [absensiForm, setAbsensiForm] = useState({
        id: '',
        status: '',
        time: ''
    })
    const [queryDate, setQueryDate] = useState(localStorage.getItem('date'))
    const {updateSelectedClassInStudentsPages} = useClassStore()
    const {studentPickedInStudentsPages} = useStudentsStore()
    const {id, nisn, name, absensi} = studentPickedInStudentsPages

    const sendCloseAction = (type) => {
        if (type === 'back') {
            onClick(false)
        } else {
            onClick(false)
            handleSubmit()
        }
    }

    const handleChange = (e) => {
        setAbsensiForm({
            ...absensiForm,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async () => {
        try {
            const reponse = await axios.patch('/absensi/update', absensiForm)
            console.log(reponse.data)
            updateSelectedClassInStudentsPages(queryDate)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setAbsensiForm({
            id: absensi?.id,
            status: absensi?.status,
            time: absensi?.time
        })
    }, [absensi])


    return (
        <>
            <div className='w-full h-full bg-neutral-200 absolute opacity-80 z-50'></div>
            <div className='w-full h-screen absolute z-50'>
                <div>
                    <div className='w-10/12 md:w-1/2 h-auto bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-md'>
                        <h1 className='text-xl font-semibold'>Update Absensi</h1>
                        <div className='mt-5'>
                            <div>
                                <label htmlFor="nisn">Nisn</label>
                                <input type="text" value={nisn} disabled={true} id='nisn' className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="nama">Nama</label>
                                <input type="text" value={name} disabled={true} id='nama' className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="status">Kehadiran</label>
                                <select onChange={(e) => handleChange(e)}
                                    name="status"
                                    id="status"
                                    value={absensiForm.status}
                                    className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'>
                                    <option value="HADIR">Hadir</option>
                                    <option value="IZIN">Izin</option>
                                    <option value="SAKIT">Sakit</option>
                                    <option value="ALPA">Alpa</option>
                                </select>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="time">Jam Masuk</label>
                                <input onChange={(e) => handleChange(e)}
                                    type="time"
                                    id='time'
                                       name='time'
                                    value={absensiForm?.time}
                                    className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                            </div>
                            <div className='mt-5 flex justify-end gap-3'>
                                <button onClick={() => sendCloseAction()}
                                    className='bg-red-700 text-white font-semibold p-2 rounded-md'>Batal</button>
                                <button
                                    onClick={() => sendCloseAction()} className='bg-blue-700 text-white font-semibold p-2 rounded-md'>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateAbsensi;