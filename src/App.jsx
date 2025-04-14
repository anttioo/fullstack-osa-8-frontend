import {NavLink, Route, Routes} from "react-router";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

export default function App() {
    return <div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NavLink to="/">authors</NavLink>
            <NavLink to="books">books</NavLink>
            <NavLink to="add">add book</NavLink>
        </div>

        <Routes>
            <Route index element={<Authors/>}/>
            <Route path="books" element={<Books/>}/>
            <Route path="add" element={<NewBook/>}/>
        </Routes>
    </div>
}
