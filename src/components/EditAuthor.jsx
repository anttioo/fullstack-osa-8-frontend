import {useState} from "react";
import {AUTHORS_QUERY, EDIT_AUTHOR} from "../queries.js";
import {useMutation, useQuery} from "@apollo/client";

export default function EditAuthor() {

    const [selectedAuthor, setSelectedAuthor] = useState("")
    const [newBorn, setNewBorn] = useState(0)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [
            {query: AUTHORS_QUERY},
        ],
    })

    const {loading, data} = useQuery(AUTHORS_QUERY)

    async function handleSubmit(event) {
        event.preventDefault()

        if (selectedAuthor === "") return

        await editAuthor({variables: {name: selectedAuthor, born: newBorn}})

        setSelectedAuthor("")
        setNewBorn(0)
    }

    function handleBornChange(event) {
        const value = parseInt(event.target.value, 10)
        setNewBorn(isNaN(value) ? 0 : value)
    }

    function handleAuthorChange(event) {
        const value = event.target.value
        const previousBorn = authors.find(a => a.name === value).born || 0

        setSelectedAuthor(value)
        setNewBorn(previousBorn)
    }

    const authors = data ? data.allAuthors : []

    if (loading) return <p>Loading...</p>

    return <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
            <div>
                Author
                <select value={selectedAuthor} onChange={handleAuthorChange}>
                    <option value="" disabled>Select author</option>
                    {authors.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
            </div>
            <div>
                Born
                <input type="number" value={newBorn} onChange={handleBornChange}/>
            </div>
            <button
                type="submit"
                disabled={selectedAuthor === ""}
            >
                update author
            </button>
        </form>
    </div>


}