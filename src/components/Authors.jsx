import { gql, useQuery } from '@apollo/client'

const AUTHORS_QUERY = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`


export default function Authors() {

    const { loading, data } = useQuery(AUTHORS_QUERY)

    const authors = data ? data.allAuthors : []

    if (loading) return <p>Loading...</p>

    //if (!props.show) return null

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


