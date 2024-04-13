    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import React, {useEffect, useState} from 'react';
    import {Link, matchRoutes, useLocation} from 'react-router-dom';
    import '../assets/css/Sidebar.css'
    import useStoreSideBar from "../store/SidebarStore.js";

    const LinkSideBar = ({ icon, title, href }) => {
        const [active, setActive] = useState(false)
        const location = useLocation()

        const handleClick = () => {
            localStorage.setItem('activeUrl', href)
        }

        useEffect(() => {
            const activeUrl = localStorage.getItem('activeUrl')
            if (activeUrl === null) {
                localStorage.setItem('activeUrl', '/')
            } else {
                if (activeUrl === href) {
                    setActive(true)
                } else {
                    setActive(false)
                }
            }
        }, [])

        useEffect(() => {
            localStorage.setItem('activeUrl', location.pathname)
        }, [location.pathname])

        return (
            <Link className="w-full" to={href}>
                <button
                    onClick={() => handleClick()}
                    type='button'
                    className={`w-fit sm:w-full outline-none border-none sm:h-12 p-2 rounded-md flex items-center sm:gap-5 transition-all hover:bg-white hover:text-primary
                        ${active ? 'bg-white text-primary' : 'bg-primary text-white'}
                    `}>
                    <FontAwesomeIcon icon={icon} />
                    <p className='font-semibold hidden sm:block'>
                        {title}
                    </p>
                </button>
            </Link>
        );
    };

    export default LinkSideBar;
