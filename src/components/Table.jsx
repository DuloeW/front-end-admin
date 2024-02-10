import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import '../assets/css/Custom.css'
import UpdateAbsensi from "./UpdateAbsensi.jsx";

const Table = ({onClickOpen}) => {

    const sendShowAction = () => {
        onClickOpen(true)
    }

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
                <tr className='border-b-2 border-neutral-200'>
                        <td>83293829</td>
                        <td>I Putu Bayu Gelgel Wiyantara</td>
                        <td>Hadir</td>
                        <td>05.00</td>
                        <td onClick={() => sendShowAction()}>
                            <p className='bg-blue-700 text-white font-semibold text-center rounded-md py-2 cursor-pointer'>Edit</p>
                        </td>
                </tr><tr className='border-b-2 border-neutral-200'>
                        <td>83293829</td>
                        <td>I Putu Bayu Gelgel Wiyantara</td>
                        <td>Hadir</td>
                        <td>05.00</td>
                        <td onClick={() => sendShowAction()}>
                            <p className='bg-blue-700 text-white font-semibold text-center rounded-md py-2 cursor-pointer'>Edit</p>
                        </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table