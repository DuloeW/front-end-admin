import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuildingUn, faBuildingUser, faClapperboard, faSchoolFlag} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faSquarespace} from "@fortawesome/free-brands-svg-icons";
import '../assets/css/BoxInfoClass.css'
import DetailClass from "./DetailClass.jsx";
import {useEffect, useState} from "react";
import useClassStore from "../store/ClassStore.js";
import useStudentsStore from "../store/StudentsStore.js";

const BoxInfoClass = ({className, grade, dataClass}) => {
    const [showDetail, setShowDetail] = useState(false)
    const {classSelected, setClassSelected, setLengthStudentsOfClassSelected} = useClassStore()

    const openDetail = async () => {
        setShowDetail(true)
        setClassSelected(dataClass)
        await setLengthStudentsOfClassSelected(dataClass.id)
    }

    const handleClose = (value) => {
        setShowDetail(value)
    }

    const removeSymbol = (string) => {
        return string.replace(/_/g, ' ')
    }

    return (
        <>
            <div className='box-info-class w-[300px] h-32 p-4 gap-4 relative bg-white rounded-xl flex justify-evenly overflow-hidden'>
                <div className='h-full flex justify-center items-center absolute left-10 -bottom-5'>
                        <FontAwesomeIcon icon={faSquarespace} className='text-[250px] text-teal-900 opacity-15'/>
                </div>
                <div className='w-full h-full relative text-primary'>
                    <h1 className='text-xl font-bold'>{removeSymbol(className)}</h1>
                    <p className='font-semibold'>{grade}</p>
                    <button className='absolute bottom-0 right-0 p-2 text-sm tracking-wide bg-primary rounded-lg font-semibold text-white'>
                        <p onClick={() => openDetail()}>Selengkapnya</p>
                    </button>
                </div>
            </div>
            {showDetail && <DetailClass data={classSelected} onclick={handleClose}/>}
        </>
    )
}

export default BoxInfoClass;