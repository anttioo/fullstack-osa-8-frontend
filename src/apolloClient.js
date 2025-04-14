import {ApolloClient, ApolloLink, HttpLink, InMemoryCache, split} from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000',
}))

const authMiddleware = new ApolloLink((operation, forward) => {

    operation.setContext(({headers: previousHeaders = {}}) => {
        const token = sessionStorage.getItem('user-token')
        const headers = {...previousHeaders}
        if (token) headers.Authorization = `Bearer ${token}`
        return {headers: {...headers}}
    });

    return forward(operation);
})

const splitLink = split(
    ({ query }) => {
        const mainDef = getMainDefinition(query)
        return mainDef.kind === 'OperationDefinition' && mainDef.operation === 'subscription'
    },
    wsLink,
    authMiddleware.concat(httpLink)
)

export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    link: splitLink,
})
