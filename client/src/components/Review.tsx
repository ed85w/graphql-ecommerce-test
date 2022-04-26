import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { IProps as Props } from '../App'

interface IProps {
  review: Props["review"]
}

const Review: React.FC<IProps> = ({review}) => {
  return ( 
    <Grid container justifyContent="center" spacing={2}>
      <Grid item justifyContent="center" textAlign="center" marginTop={2}>
        <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
        <Typography component="legend">Rating</Typography>
        <Rating name="read-only" value={review.rating} readOnly />
      </Grid>          
    </Grid>
  );
}
 
export default Review;