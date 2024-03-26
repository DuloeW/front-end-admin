import useStudentsStore from "./store/StudentsStore.js";
import useClassStore from "./store/ClassStore.js";
import React, {useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DasboardPages from "./pages/DasboardPages.jsx";
import StudentsPages from "./pages/StudentsPages.jsx";
import QrPages from "./pages/QrPages.jsx";
import CreateReportPage from "./pages/CreateReportPage.jsx";
import './index.css'

const App = () => {
    const {getAllStudents} = useStudentsStore();
    const {getAllClasses} = useClassStore();
    useEffect(() => {
        getAllStudents()
        getAllClasses()
    }, []);
    const router = createBrowserRouter([
        {
            name: 'login',
            path: '/login',
            element: <LoginPage/>
        },
        {
            name: 'dasboard',
            path: '/',
            element: (
                <ProtectedRoute>
                    <DasboardPages/>
                </ProtectedRoute>
            )
        },
        {
            name: 'students',
            path: '/students',
            element: (
                <ProtectedRoute>
                    <StudentsPages/>
                </ProtectedRoute>
            )
        },
        {
            name: 'qr',
            path: '/qr',
            element: (
                <ProtectedRoute>
                    <QrPages/>
                </ProtectedRoute>
            )
        },
        {
            name: 'report',
            path: '/report',
            element: (
                <ProtectedRoute>
                    <CreateReportPage/>
                </ProtectedRoute>
            )
        },
        {
            name: 'not-found',
            path: '*',
            element: <h1>404 Not Found</h1>
        }
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    )
}

export default App;