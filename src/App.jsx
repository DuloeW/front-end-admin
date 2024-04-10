import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DasboardPages from "./pages/DasboardPages.jsx";
import StudentsPages from "./pages/StudentsPages.jsx";
import QrPages from "./pages/QrPages.jsx";
import CreateReportPage from "./pages/CreateReportPage.jsx";
import './index.css'
import PageNotFound from "./components/PageNotFound.jsx";

const App = () => {
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
            element: <PageNotFound/>
        }
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    )
}

export default App;