import {NavLink, Route, Routes} from "react-router";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";

export default function App() {
    return <div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NavLink to="/">authors</NavLink>
            <NavLink to="edit-author">edit author</NavLink>
            <NavLink to="books">books</NavLink>
            <NavLink to="add">add book</NavLink>
        </div>

        <Routes>
            <Route index element={<Authors/>}/>
            <Route path="edit-author" element={<EditAuthor/>}/>
            <Route path="books" element={<Books/>}/>
            <Route path="add" element={<NewBook/>}/>
        </Routes>
    </div>
}
