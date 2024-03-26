import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import '../assets/css/Custom.css'
import UpdateAbsensi from "./UpdateAbsensi.jsx";
import useClassStore from "../store/ClassStore.js";
import useStudentsStore from "../store/StudentsStore.js";

const Table = ({onClickOpen, classStudentsPage, keyword}) => {

    const [classSelected, setClassSelected] = useState({})
    const {setStudentPickedInStudentsPages} = useStudentsStore()

    const sendShowAction = (student) => {
        onClickOpen(true)
        setStudentPickedInStudentsPages(student)
    }

    useEffect(() => {
        setClassSelected(classStudentsPage)
    }, [classStudentsPage])

    useEffect(() => {
        if(keyword !== '') {
            const filter = classSelected?.students?.filter((student) => {
                return student.name.toLowerCase().includes(keyword.toLowerCase())
            })
            setClassSelected(prevState => ({
                ...prevState,
                students: filter
            }))
        } else {
            setClassSelected(classStudentsPage)
        }
    }, [keyword]);

    return (
        <table className='w-full h-full'>
            <tbody>
                <tr className='border-b-2 border-b-neutral-200'>
                    <th>Nisn</th>
                    <th>Nama Siswa</th>
                    <th>Kehadiran</th>
                    <th>Jam Masuk</th>
                    <th className='text-center'>Aksi</th>
                </tr>
            </tbody>
            <tbody>
                {classSelected?.students?.map((student) => (
                    <tr className='border-b-2 border-neutral-200' key={student.nisn}>
                        <td>{student.nisn}</td>
                        <td>{student.name}</td>
                        <td>{student.absensi?.status}</td>
                        <td>{student.absensi?.time}</td>
                        <td onClick={() => sendShowAction(student)}>
                            <p className='bg-blue-700 text-white font-semibold text-center rounded-md py-2 cursor-pointer'>Edit</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table