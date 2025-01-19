import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../features/authSlice"
import { useAppDispatch } from "../store/hooks"
import Button from "../components/Button"

interface LoginPageProps {
    
}
 
const LoginPage: React.FC<LoginPageProps> = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = async () => {
        await dispatch(login({ loginValue, password }))
        navigate('/')
    }

    return (
        <div className="p-4 flex flex-col gap-2 w-1/3 mx-auto">
            <input placeholder="Логин" value={loginValue} onChange={e => setLoginValue(e.target.value)} />
            <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleLogin} color="blue">Войти</Button>
        </div>
    )
}
 
export default LoginPage;