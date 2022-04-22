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

interface IProps {
  product: {
    id: string
    name: string  
    description: string
    quantity: number
    price: number
    image: string
    slug: string
    onSale: boolean
    category: string
    reviews: string[]
  },
  products: {
    id: string
    name: string  
    description: string
    quantity: number
    price: number
    image: string
    slug: string
    onSale: boolean
    category: string
    reviews: string[]
  }[],
}

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
  const [products, setProducts] = useState<IProps["products"]>()

  useEffect(() => {
    if(data) {
      console.log("use effect")
      const prods:IProps["products"] = data.products.map((product:IProps["product"]) => ({ ...product, slug: slugify(product.name) }));
      setProducts(prods)
    }
  },[data])

  const slugify = (name: string) => {
    return name.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  }

  return (
    <Grid 
      container 
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
