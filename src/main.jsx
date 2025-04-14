import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from "react-router";

import App from "./App.jsx";

import {client} from "./apolloClient.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);
