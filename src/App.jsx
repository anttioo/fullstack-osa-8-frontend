import {NavLink, Route, Routes} from "react-router";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";
import Login from "./components/Login.jsx";
import {useContext} from "react";
import {AuthContext} from "./contexts/auth.jsx";
import Recommended from "./components/Recommended.jsx";
import {useSubscription} from "@apollo/client";
import {BOOK_ADDED} from "./queries.js";

export default function App() {

    const { logout, me } = useContext(AuthContext)

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            console.log("data", data)
            const bookAdded = data.data.bookAdded
            if (bookAdded) {
                window.alert(`a book ${bookAdded.title} added`)
            }
        }
    })


    return <div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NavLink to="/">authors</NavLink>
            { me && <NavLink to="edit-author">edit author</NavLink> }
            <NavLink to="books">books</NavLink>
            { me && <NavLink to="add">add book</NavLink> }
            { me && <NavLink to="recommended">recommended</NavLink> }
            { me && <button onClick={logout}>logout</button> }
            { !me && <NavLink to="login">login</NavLink> }
        </div>

        <Routes>
            <Route index element={<Authors/>}/>
            { me && <Route path="edit-author" element={<EditAuthor/>}/> }
            <Route path="books" element={<Books/>}/>
            { me && <Route path="add" element={<NewBook/>}/> }
            { me && <Route path="recommended" element={<Recommended/>}/> }
            { !me && <Route path="login" element={<Login/>}/> }
        </Routes>

    </div>
}
