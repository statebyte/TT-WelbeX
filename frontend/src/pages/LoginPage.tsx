import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "../features/authSlice"
import { useAppDispatch } from "../store/hooks"
import Button from "../components/Button"
import InputField from "../components/Input"

interface LoginPageProps {
    
}
 
const LoginPage: React.FC<LoginPageProps> = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [login, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = async () => {
        await dispatch(loginThunk({ login, password }))
        navigate('/')
    }

    const isFormValid = login !== '' && password !== '';

    return (
        <div className="p-4 flex flex-col gap-2 w-1/3 mx-auto">
            <InputField placeholder="Логин" value={login} onChange={e => setLoginValue(e.target.value)} />
            <InputField placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleLogin} color="blue" disabled={!isFormValid}>Войти</Button>
        </div>
    )
}
 
export default LoginPage;