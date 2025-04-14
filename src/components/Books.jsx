import { gql, useQuery } from '@apollo/client'

const BOOKS_QUERY = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`

export default function Books() {

    const { loading, data } = useQuery(BOOKS_QUERY)

    const books = data ? data.allBooks : []

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
                {books.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

