import {createContext, useContext, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {useNavigate} from "react-router";
import {LOGIN, ME} from "../queries.js";

export const AuthContext = createContext({
    me: null,
    login: () => {},
    logout: () => {},
})

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {

    let navigate = useNavigate();

    const [token, setToken] = useState(sessionStorage.getItem('user-token'))
    const [doLogin] = useMutation(LOGIN, {
        onError: (error) => {
            console.error('Error logging in:', error)
        },
    })

    const {data} = useQuery(ME, {
        skip: token === null,
        context: { headers: { Authorization: `Bearer ${token}` }},
    })

    function login(username, password) {
        doLogin({variables: {username, password}})
            .then(({data}) => {
                const token = data.login.value
                sessionStorage.setItem('user-token', token)
                setToken(token)
                navigate("/");
            })
            .catch(error => console.error('Error logging in:', error))
    }

    function logout() {
        sessionStorage.removeItem('user-token')
        setToken(null)
        navigate("/");
    }

    const me = data && 'me' in data ? data.me : null

    return <AuthContext.Provider value={{ me, login, logout}}>
            {children}
        </AuthContext.Provider>

}
