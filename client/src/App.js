import './App.css';
import { Outlet } from 'react-router-dom'
import {
  useQuery,
  gql
} from "@apollo/client";
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

const ALL_PRODUCTS_QUERY = gql`
query AllProductsQuery {
  products {
    id
    name
    description
    price
    onSale
    image
    category {
      name
    }
    reviews {
      date
      comment
      rating
    }
  }
}
`

function App() {

  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);
  const [products, setProducts] = useState()

  useEffect(() => {
    if(data) {
      console.log("use effect")
      const prods = data.products.map(obj => ({ ...obj, slug: slugify(obj.name) }));
      setProducts(prods)
    }
  },[data])

  const slugify = (name) => {
    return name.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  }

  return (
    <Grid 
      container 
      fixed 
      spacing={4}
      justifyContent="center"
    >
      <Header />
      <Outlet context={[products, setProducts]}/>
      <Footer />
    </Grid>
  );
}

export default App;
