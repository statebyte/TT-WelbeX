import { Link } from "react-router-dom"
import { logout } from "../features/authSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.auth.token)
    const login = useAppSelector(state => state.auth.login)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="flex justify-between p-4 bg-gray-200">
            <div className="flex space-x-4">
                <div>
                    <Link to="/" className="hover:text-blue-500 transition-colors duration-300">WelbeX Blog Home</Link>
                </div>
                <div className="flex space-x-4">
                    {!token && <Link to="/login" className="hover:text-blue-500 transition-colors duration-300">Войти</Link>}
                    {!token && <Link to="/register" className="hover:text-blue-500 transition-colors duration-300">Зарегистрироваться</Link>}
                </div>
            </div>
            {token && <button className="text-red-600" onClick={handleLogout}>Выход ({login})</button>}
        </nav>
    )
}

export default NavBar;