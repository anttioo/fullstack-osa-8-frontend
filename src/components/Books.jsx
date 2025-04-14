import { useQuery } from '@apollo/client'
import {BOOKS_QUERY} from "../queries.js";
import {useMemo, useState} from "react";

export default function Books() {
    const [selectedGenres, setSelectedGenres] = useState([])
    const { loading, data: { allBooks } = { allBooks: [] } } = useQuery(BOOKS_QUERY)

    const allGenres = useMemo(() => {
        return [...new Set(allBooks.map(b => b.genres).flat())]
    }, [allBooks])

    const filteredBooks = selectedGenres.length === 0
        ? allBooks
        : allBooks.filter(b => b.genres.some(g => selectedGenres.includes(g)))

    function handleGenreChange(genre, value) {
        setSelectedGenres(!value
            ? selectedGenres.filter(g => g !== genre)
            : selectedGenres.concat(genre))
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
                {filteredBooks.map((a) => (
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
                    const selected = selectedGenres.includes(g)
                    return <li key={g}>{g}
                        <input type="checkbox" checked={selected} onChange={() => handleGenreChange(g, !selected)}/>
                    </li>
                })}
            </ul>
        </div>
    )
}

