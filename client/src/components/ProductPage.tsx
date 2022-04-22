import { useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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

const ProductPage = () => {

  const { slug } = useParams();

  const [products, setProducts] = useOutletContext<ProductsInterface["products"]>();

  console.log('product page', products)

  return (
    <>
      {products && products.map((product:ProductType) => (
        product.slug === slug ?
          <Card sx={{ maxWidth: 345 }} key={product.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/728x90.png?text=${product.image}`}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  £{product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
         :
        null
      ))}
    </>
   );
}
 
export default ProductPage;