import {useContext} from "react";
import {AuthContext} from "../contexts/auth.jsx";
import { useQuery } from '@apollo/client'
import {BOOKS_QUERY} from "../queries.js";

export default function Recommended() {
    const { me } = useContext(AuthContext)

    const genre = me ? me.favoriteGenre : ""

    const { loading, data: { allBooks } = { allBooks: [] } } = useQuery(BOOKS_QUERY, {
        variables: { genre },
    })

    if (!me) {
        return <div>login to see recommended books</div>
    }

    if (loading) return <p>Loading...</p>

    return <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <strong>{genre}</strong></p>
        <table>
        <tbody>
        <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
        </tr>
        {allBooks.map((a) => (
            <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
            </tr>
        ))}
        </tbody>
    </table>
</div>

}