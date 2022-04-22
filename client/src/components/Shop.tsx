import { Grid } from '@mui/material';
import Product from './Product';
import { useOutletContext } from "react-router-dom";

interface ProductType {
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
  map: Function      // ??????? is this correct
}

interface ProductsInterface {
  products: Array<ProductType>
}

const Shop = () => {

  const [products, setProducts] = useOutletContext<ProductsInterface["products"]>();

  console.log("shop", products)

  return (
    <>
      {products && 
        products.map((product: ProductType) => (
          <Grid item xs={12} md={6} lg={3} key={product.id}>
            <Product product={product}/>
          </Grid>
        ))
      }
    </>
  );
}
 
export default Shop;