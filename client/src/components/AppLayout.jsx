import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"


const AppLayOut = () => {
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
                <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Outlet />
                <Footer />
            </main>
        </div>

    )
}

export default AppLayOut