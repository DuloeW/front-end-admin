    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import React, {useEffect, useState} from 'react';
    import {Link, matchRoutes, useLocation} from 'react-router-dom';
    import '../assets/css/Sidebar.css'

    const LinkSideBar = ({ icon, title, href }) => {
        const [active, setActive] = useState(false)
        const location = useLocation()


        // useEffect(() => {
        //     console.log("Location Pathname:", location.pathname);
        //     console.log("Href:", href);
        //
        //     if (location.pathname === href) {
        //         setActive(true);
        //     } else {
        //         setActive(false);
        //     }
        //
        // }, []);
        //
        // useEffect(() => {
        //     console.log("Active:", active);
        // }, [location.pathname]);

        return (
            <Link to={href}>
                <button
                    type='button'
                    className={`w-full outline-none border-none h-12 p-2 rounded-md flex items-center gap-5 transition-all text-white hover:bg-white hover:text-primary`}>
                    <FontAwesomeIcon icon={icon} />
                    <p className='font-semibold'>
                        {title}
                    </p>
                </button>
            </Link>
        );
    };

    export default LinkSideBar;
