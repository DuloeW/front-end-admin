import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DasboardPages from "./pages/DasboardPages.jsx";
import StudentsPages from "./pages/StudentsPages.jsx";
import QrPages from "./pages/QrPages.jsx";
import CreateReportPage from "./pages/CreateReportPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useStudentsStore from "./store/StudentsStore.js";
import useClassStore from "./store/ClassStore.js";



const App = () => {
    const {getAllStudents} = useStudentsStore();
    const {getAllClasses} = useClassStore();
    useEffect(() => {
        getAllStudents()
        getAllClasses()
    }, []);
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <DasboardPages/>
                </ProtectedRoute>
            )
        },
        {
            path: '/students',
            element: <StudentsPages/>
        },
        {
            path: '/qr',
            element: <QrPages/>
        },
        {
            path: '/report',
            element: <CreateReportPage/>
        },
        {
            path: '*',
            element: <h1>404 Not Found</h1>
        }
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
