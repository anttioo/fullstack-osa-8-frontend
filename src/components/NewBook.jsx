import {useState} from 'react'

import { useMutation } from '@apollo/client'

import {ADD_BOOK, AUTHORS_QUERY, BOOKS_QUERY} from "../queries.js";
import {useNavigate} from "react-router";

export default function NewBook() {

    let navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: AUTHORS_QUERY },
            { query: BOOKS_QUERY },
        ],
    })

    const submit = async (event) => {
        event.preventDefault()

        const publishedInt = parseInt(published, 10)

        if (isNaN(publishedInt)) {
            console.error('published must be a number')
            return
        }

        await addBook({
            variables: { title, author, published: publishedInt, genres },
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')

        navigate("/books");
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}
