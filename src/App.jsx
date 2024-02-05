import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DasboardPages from './pages/DasboardPages'
import StudentsPages from './pages/StudentsPages'
import QrPages from './pages/QrPages'
import CreateReportPage from "./pages/CreateReportPage.jsx";

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<DasboardPages/>}/>
                    <Route path='/students' element={<StudentsPages/>}/>
                    <Route path='/qr' element={<QrPages/>}/>
                    <Route path={'/report'} element={<CreateReportPage/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App