import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useState, useEffect } from 'react';
import { IProps as Props } from '../App'

interface IProps {
  products: Props["products"]
  setProducts: React.Dispatch<React.SetStateAction<Props["products"]>>
  product: Props["product"]
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
      rating
    }
  }
}
`

const Shop = () => {

  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);
  const [products, setProducts] = useState<IProps["products"]>()

  useEffect(() => {
    if(data) {
      console.log("use effect")
      setProducts(data.products)
    }
  },[data])

  console.log("shop", products)

  return (
    <>
      {products && 
        products.map((product:IProps["product"]) => (
          <Grid item xs={12} md={6} lg={3} key={product.id}>
            <ProductCard product={product}/>
          </Grid>
        ))
      }
    </>
  );
}
 
export default Shop;