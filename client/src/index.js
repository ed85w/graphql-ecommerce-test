import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query {
        products {
          name
          description
          category {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


