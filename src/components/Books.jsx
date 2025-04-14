import { useQuery } from '@apollo/client'
import {BOOKS_QUERY} from "../queries.js";
import {useState} from "react";

export default function Books() {
    const [selectedGenre, setSelectedGenre] = useState(null)

    const { loading, data: { allBooks } = { allBooks: [] } } = useQuery(BOOKS_QUERY, {
        variables: {...(selectedGenre ? { genre: selectedGenre } : {})}
    })

    const [allGenres, setAllGenres] = useState([])

    if (allGenres.length === 0 && selectedGenre === null && !loading && allBooks.length > 0) {
        setAllGenres([...new Set(allBooks.map(b => b.genres).flat())])
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h2>books</h2>
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
            <h2>genres</h2>
            <ul>
                {allGenres.map((g) => {
                    const selected = g === selectedGenre
                    return <li key={g}>{g}
                        <input type="checkbox" checked={selected} onChange={() => setSelectedGenre(selected ? null : g)}/>
                    </li>
                })}
            </ul>
        </div>
    )
}

