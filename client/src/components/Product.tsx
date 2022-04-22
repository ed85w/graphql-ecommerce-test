import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ProductType {
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
  }
}


const Product = ({product}:ProductType) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea
          href={product.slug}
        >
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
   );
}
 
export default Product;