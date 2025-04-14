import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache} from '@apollo/client'

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',

});

const authMiddleware = new ApolloLink((operation, forward) => {

    operation.setContext(({headers: previousHeaders = {}}) => {
        const token = sessionStorage.getItem('user-token')
        const headers = {...previousHeaders}
        if (token) headers.Authorization = `Bearer ${token}`
        return {headers: {...headers}}
    });

    return forward(operation);
})

export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
})
