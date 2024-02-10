import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import TitlePage from '../components/TitlePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faSchool, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import BoxInfoData from '../components/BoxInfoData'
import PieChart from '../components/PieChart'
import UserData from '../Data'
import DigitalClock from '../components/DigitalClock'
import ListClass from "../components/ListClass.jsx";
import Header from "../components/Header.jsx";
import useStudentsStore from "../store/StudentsStore.js";
import useClassStore from "../store/ClassStore.js";
import axios from "../axios/axios.js";


const DasboardPages = () => {
    const {students, getAllStudents} = useStudentsStore();
    const {classes, getAllClasses} = useClassStore();
    const [labels, setLabels] = useState([]);
    const [chart, setChart] = useState([])

    const addDataPie = async () => {
        try {
            const hadir = await getAbsensiByStatus(0);
            const izin = await getAbsensiByStatus(1);
            const sakit = await getAbsensiByStatus(2);
            const apla = await getAbsensiByStatus(3);
            const data = [
                {id: 1, status: "Hadir", siswa: hadir},
                {id: 2, status: "Izin", siswa: izin},
                {id: 3, status: "Sakit", siswa: sakit},
                {id: 4, status: "Alpa", siswa: apla},
            ]
            setChart(data)
            setLabels(data.map((data) => data.status))
        } catch (err) {
            console.log(err)
        }
    }

    const getAbsensiByStatus = async (status = 0) => {
        try {
            const body = {
                status: status,
                date: new Date(),
            };
            const response = await axios.post('absensi/get/status', body);
            console.log(status, '', response.data.data.length)
            return await response.data.data.length | 0;
        } catch(err) {
            console.error(err);
            return 0;
        }
    }

    let dataChart = {
        datasets: [
            {
                label: "Jumlah Siswa",
                data: chart.map((data) => data.siswa),
                backgroundColor: [
                    "rgb(75,255,103)",
                    "#1ec8e0",
                    "#ffcb4b",
                    "#d50d0d",
                ],
                // borderColor: "black",
                shadowColor: '0 0 20px #000',
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        addDataPie();
    }, []);

    // untuk box info
    useEffect(() => {
        getAllStudents();
        getAllClasses()
    }, [])

    //untuk real time add student
    useEffect(() => {
        getAllStudents()
    }, [students.length]);


    return (
        <div className='w-full h-fit bg-neutral-200 flex overflow-x-hidden overflow-y-auto'>
            <Sidebar />
            <div className='w-11/12 h-fit p-5 flex flex-col gap-11'>
                <Header title={'Dasboard Utama'} urLTitle={'pages/dasboard'}/>
                <section className='w-full grid grid-rows-1 grid-cols-2 gap-10'>
                    <BoxInfoData icon={faSchool} title={"Jumlah Kelas"} data={classes.length} />
                    <BoxInfoData icon={faUsers} title={"Jumlah Siswa"} data={students.length} />
                    <PieChart data={dataChart} labels={labels}/>
                    <DigitalClock />
                </section>
                <section className='w-full relative'>
                    <ListClass classes={classes}/>
                </section>
            </div>
        </div>
    )
}

export default DasboardPages;