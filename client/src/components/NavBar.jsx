import { Switch } from "@/components/ui/switch"
import { FaAndroid } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ darkMode, toggleDarkMode, isAuthenticated, setIsAuthenticated, username, setUsername }) => {
    const [showNavBar, setShowNavBar] = useState(false)

    function logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        setUsername(null);
    }
    return (
        <>
            <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624]">
                <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
                    DevFolio
                </Link>
                <ul className="flex items-center  justify-end gap-9 text-[#2a2a32] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">

                    {isAuthenticated ? <>
                        <li>Hi, {username}</li>
                        <li onClick={logout} className="cursor-pointer">Logout</li>
                    </> :
                        <>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active" : ""} to='/login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? "active" : ""} to='/signup'>Register</NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "active" : ""} to='/create'>Create Post</NavLink>
                    </li>
                </ul>

                <Switch onCheckedChange={toggleDarkMode} checked={darkMode} />
                <FaAndroid className="text-2xl cursor-pointer hidden max-md:block dark:text-white" onClick={() => setShowNavBar(curr => !curr)} />
            </nav>

            {showNavBar && <ResponsiveNavBar isAuthenticated={isAuthenticated} logout={logout} username={username} />}
        </>
    )
}

export default NavBar