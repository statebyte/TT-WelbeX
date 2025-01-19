import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"
import { useState } from "react"
import { registerUser } from "../features/authSlice"
import Button from "../components/Button"

interface RegisterPageProps {
    
}
 
const RegisterPage: React.FC<RegisterPageProps> = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleRegister = async () => {
        await dispatch(registerUser({ login: loginValue, password }))
        navigate('/login')
    }

    return (
        <div className="p-4 flex flex-col gap-2 w-1/3 mx-auto">
            <input placeholder="Логин" value={loginValue} onChange={e => setLoginValue(e.target.value)} />
            <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input placeholder="Повторите пароль" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
            <Button onClick={handleRegister} color="green" disabled={password.length == 0 || password !== passwordConfirm}>Зарегистрироваться</Button>
        </div>
    )
}
 
export default RegisterPage;