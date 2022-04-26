import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';

import { IProps as Props } from '../App'

interface IProps {
  product: Props["product"]
}

const getAvgRating = (product:IProps["product"]) => {
  let sumRating = 0;
  let numberOfReviews = 0;
  
  // loop through reviews
  product.reviews.forEach((review:any) => {
    numberOfReviews += 1;
    sumRating += review.rating
  });
  // calculate the avergae score of the reviews for the product 
  const avgProductRating = sumRating / numberOfReviews;

  // if the average score is greater than or equal to the filter val then return it (filter returns product if true)
  return avgProductRating
}

const Product: React.FC<IProps> = ({product}) => {

  const avgProductRating = getAvgRating(product)

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea
          href={product.id}
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
            <Typography component="legend" marginTop={'20px'}>Avg Rating</Typography>
            <Rating name="read-only" value={avgProductRating} readOnly />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
   );
}
 
export default Product;