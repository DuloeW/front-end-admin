import React, {useEffect, useMemo, useState} from 'react'
import Sidebar from '../components/Sidebar'
import { faGear, faSchool, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import BoxInfoData from '../components/BoxInfoData'
import PieChart from '../components/PieChart'
import DigitalClock from '../components/DigitalClock'
import ListClass from "../components/ListClass.jsx";
import Header from "../components/Header.jsx";
import useStudentsStore from "../store/StudentsStore.js";
import useClassStore from "../store/ClassStore.js";
import axios from "../axios/axios.js";
import Cookies from "js-cookie";


const DasboardPages = () => {
    const token = Cookies.get('token');
    const {students, getAllStudents} = useStudentsStore();
    const {classes, getAllClasses} = useClassStore();
    const [labels, setLabels] = useState([]);
    const [chart, setChart] = useState([])
    const dataChart = useMemo(() => ({
        datasets: [
            {
                label: "Jumlah Siswa",
                data: chart.map((item) => item.siswa),
                backgroundColor: [
                    "rgb(75,255,103)",
                    "#1ec8e0",
                    "#ffcb4b",
                    "#d50d0d",
                ],
                shadowColor: '0 0 20px #000',
                borderWidth: 1,
            },
        ],
    }), [chart]);

    const addDataPie = async () => {
        try {
            const hadir = getAbsensiByStatus(0);
            const izin = getAbsensiByStatus(1);
            const sakit = getAbsensiByStatus(2);
            const apla = getAbsensiByStatus(3);
            const res = await Promise.all([hadir, izin, sakit, apla]);

            const data = res.map((data, index) => {
                return {
                    id: index + 1,
                    status: index === 0 ? "Hadir" : index === 1 ? "Izin" : index === 2 ? "Sakit" : "Alpa",
                    siswa: data
                }
            });

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
                date: new Date().toISOString().split('T')[0],
            };
            const response = await axios.post('absensi/get/status', body);
            return await response.data.data.length | 0;
        } catch(err) {
            console.error(err);
            return 0;
        }
    }

    useEffect(() => {
        addDataPie();
    }, []);


    //untuk real time add student
    useEffect(() => {
        getAllStudents()
    }, [students.length]);

    useEffect(() => {
        getAllClasses()
    }, [])


    return (
        <div className='w-full h-fit bg-neutral-200 flex flex-col sm:flex-row overflow-x-hidden overflow-y-auto'>
            <Sidebar />
            <div className='w-full h-fit p-5 flex flex-col justify-center items-center gap-11'>
                <Header title={'Dashboard Utama'} urLTitle={'pages/dashboard'}/>
                <section className='w-full grid lg:grid-rows-1 lg:grid-cols-2 gap-10 place-items-center'>
                    <BoxInfoData icon={faSchool} title={"Jumlah Kelas"} data={classes.length} />
                    <BoxInfoData icon={faUsers} title={"Jumlah Siswa"} data={students.length} />
                    <PieChart data={dataChart} labels={labels}/>
                    <div className="w-full hidden md:flex md:justify-center">
                        <DigitalClock />
                    </div>
                </section>
                <section className='w-full grid place-items-center relative'>
                    <ListClass classes={classes}/>
                </section>
            </div>
        </div>
    )
}

export default DasboardPages;