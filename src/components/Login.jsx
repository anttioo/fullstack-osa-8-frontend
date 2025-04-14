import {useContext, useState} from "react";
import {AuthContext} from "../contexts/auth.jsx";

export default function Login() {

    const { login } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        login(username, password)
    }


    return <div>
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    autoComplete="current-password"
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>

}