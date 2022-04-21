import { Grid } from '@mui/material';
import Product from './Product';
import { useOutletContext } from "react-router-dom";

const Shop = () => {

  const [products, setProducts] = useOutletContext();

  console.log("shop", products)

  return (
    <>
      {products && 
        products.map((product) => (
          <Grid item xs={12} md={6} lg={3} key={product.id}>
            <Product product={product}/>
          </Grid>
        ))
      }
    </>
  );
}
 
export default Shop;