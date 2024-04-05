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
        if(student.absensi === undefined) {
            alert('Siswa ini belum absen')
            return
        }
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
                    <th className="text-sm md:text-base">Nisn</th>
                    <th className="text-sm md:text-base">Nama Siswa</th>
                    <th className="text-sm md:text-base">Kehadiran</th>
                    <th className="text-sm md:text-base">Jam Masuk</th>
                    <th className='text-center text-sm md:text-base'>Aksi</th>
                </tr>
            </tbody>
            <tbody>
                {classSelected?.students?.map((student) => (
                    <tr className='border-b-2 border-neutral-200 border-spacing-2' key={student.nisn}>
                        <td className="text-sm md:text-base">{student.nisn}</td>
                        <td className="text-sm md:text-base">{student.name}</td>
                        <td className="text-sm md:text-base">{student.absensi?.status}</td>
                        <td className="text-sm md:text-base">{student.absensi?.time}</td>
                        <td onClick={() => sendShowAction(student)}>
                            <p className='bg-blue-700 text-sm md:text-base text-white font-semibold text-center rounded-md py-2 cursor-pointer'>Edit</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table