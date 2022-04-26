import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import App from './App';
import ProductPage from './components/ProductPage';
import Shop from './components/Shop'
import EditProduct from './components/EditProduct';


const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route
            index
            element={
              <Shop />
            }
          />
          <Route path=':id' element={<ProductPage/>}/>
          <Route path='/edit/:id' element={<EditProduct/>}/>
        </Route>
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);


