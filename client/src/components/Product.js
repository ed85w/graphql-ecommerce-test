import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Product = ({product}) => {
  return (
    <Card sx={12}>
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
   );
}
 
export default Product;