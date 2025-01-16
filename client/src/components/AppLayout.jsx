import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Footer"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"


const AppLayOut = ({ isAuthenticated, setIsAuthenticated, setUsername, username }) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('dark') === 'true')

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem('dark', newDarkMode ? 'true' : 'false')
    }

    useEffect(() => {
        if (localStorage.getItem('dark') === null) {
            localStorage.setItem('dark', false)
        }
    }, [])

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className="w-full bg-[#ffffff] dark:bg-[#141624]">
                <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} username={username} />
                <ToastContainer />
                <Outlet />
                <Footer />
            </main>
        </div>

    )
}

export default AppLayOut