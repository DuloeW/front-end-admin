    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import React, {useEffect, useState} from 'react';
    import {Link, matchRoutes, useLocation} from 'react-router-dom';
    import '../assets/css/Sidebar.css'
    import useStoreSideBar from "../store/SidebarStore.js";

    const LinkSideBar = ({ icon, title, href }) => {
        const [active, setActive] = useState(false)
        const location = useLocation()
        const {
            activeUrl,
            setActiveUrl
        } = useStoreSideBar()

        const handleClick = () => {
            setActiveUrl(href)
        }

        useEffect(() => {
            if (activeUrl === href) {
                setActive(true)
            } else {
                setActive(false)
            }
        }, [])

        return (
            <Link to={href}>
                <button
                    onClick={() => handleClick()}
                    type='button'
                    className={`w-full outline-none border-none h-12 p-2 rounded-md flex items-center gap-5 transition-all hover:bg-white hover:text-primary
                        ${active ? 'bg-white text-primary' : 'bg-primary text-white'}
                    `}>
                    <FontAwesomeIcon icon={icon} />
                    <p className='font-semibold'>
                        {title}
                    </p>
                </button>
            </Link>
        );
    };

    export default LinkSideBar;
