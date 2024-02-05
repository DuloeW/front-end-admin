import TitlePage from "./TitlePage.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

const Header = ({urLTitle, title}) => {
    const [show, setShow] = useState(false)

    const swticthShow = () => {
        setShow(prevState => !prevState)
    }
    return (
        <>
            <header className='w-full flex justify-between bg-white p-2 rounded-md'>
                <TitlePage urlTitle={urLTitle} title={title}/>
                <div
                    className='w-32 h-fit flex relative items-center justify-evenly bg-white p-2 rounded-2xl text-neutral-700'>
                    <FontAwesomeIcon icon={faGear} onClick={() => swticthShow()} className='text-2xl'/>
                    {show && (
                        <span className='text-sm font-bold absolute -left-16 p-3 rounded-md bg-red-600 text-white'>Log Out</span>
                    )}
                    <div
                        className=' w-fit h-fit p-2 grid place-items-center bg-transparent border-2 border-teal-900 rounded-full'>
                        <FontAwesomeIcon icon={faUser} className='w-7 h-7 text-neutral-300'/>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
