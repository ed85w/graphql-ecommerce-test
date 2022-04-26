import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import {
  useQuery,
  gql
} from "@apollo/client";
import Review from './Review';
import { IProps as Props } from '../App'

interface IProps {
  products: Props["products"]
  setProducts: React.Dispatch<React.SetStateAction<Props["products"]>>
  product: Props["product"]
}

const SINGLE_PRODUCT_QUERY = gql`
  query SingleProductQuery($productId: ID!) {
    product(id: $productId) {
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
        id
        date
        comment
        rating
      }
    }
  }
`

const ProductPage = () => {

  const { id } = useParams();

  console.log(id)

  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      "productId": id
    },
  });

  const [product, setProduct] = useState<IProps["product"]>()

  useEffect(() => {
    if(data) {
      console.log(data)
      setProduct(data.product)
    }
  },[data])

  console.log('product page', product)

  return (
    <>
    {product &&
    <Grid item key={product.id}>
      <Grid 
        container
        justifyContent="center"
      >
        <Grid item>
          <Card sx={{ maxWidth: 500 }} >
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
                <Grid container justifyContent="center">
                  <Button href={`./edit/${id}`}>Edit</Button>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {
          product.reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
            />
          ))
        }

      </Grid>
    </Grid>
    }
    </>
   );
}
 
export default ProductPage;