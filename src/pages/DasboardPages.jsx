import React, { useState } from 'react'
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


const DasboardPages = () => {
    const [userData, setUserData] = useState({
        // labels: UserData.map((data) => data.status),
        datasets: [
            {
                label: "Jumlah Siswa",
                data: UserData.map((data) => data.siswa),
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
    });

    const labels = UserData.map((data) => data.status);

    return (
        <div className='w-full h-fit bg-neutral-200 flex overflow-x-hidden overflow-y-auto'>
            <Sidebar />
            <div className='w-11/12 h-fit p-5 flex flex-col gap-11'>
                <Header title={'Dasboard Utama'} urLTitle={'pages/dasboard'}/>
                <section className='w-full grid grid-rows-1 grid-cols-2 gap-10'>
                    <BoxInfoData icon={faSchool} title={"Jumlah Kelas"} data={20} />
                    <BoxInfoData icon={faUsers} title={"Jumlah Siswa"} data={1000} />
                    <PieChart data={userData} labels={labels} />
                    <DigitalClock />
                </section>
                <section className='w-full relative'>
                    <ListClass/>
                </section>
            </div>
        </div>
    )
}

export default DasboardPages