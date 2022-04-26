import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, FormEventHandler } from 'react';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";
import { Typography, Button, Container, TextField, OutlinedInput} from '@mui/material' //destructured
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

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
      quantity
      onSale
      image
      category {
        name
      }
    }
  }
`

const UPDATE_PRODUCT_QUERY = gql`
mutation UpdateProductQuery($updateProductId: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $updateProductId, input: $input) {
    name
    description
    image
    onSale
    price
    quantity
  }
}
`

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  console.log(id)

  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      "productId": id
    },
  });

  const [product, setProduct] = useState<IProps["product"]>()
  const [name, setName] = useState<IProps["product"]["name"]>()
  const [description, setDescription] = useState<IProps["product"]["description"]>()
  const [price, setPrice] = useState<IProps["product"]["price"]>()
  const [quantity, setQuantity] = useState<IProps["product"]["quantity"]>()
  const [onSale, setOnSale] = useState<IProps["product"]["onSale"]>()
  const [image, setImage] = useState<IProps["product"]["image"]>()

  useEffect(() => {
    if(data) {
      console.log(data)
      setProduct(data.product)
      setName(data.product.name)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setQuantity(data.product.quantity)
      setOnSale(data.product.onSale)
      setImage(data.product.image)
    }
  },[data])

    // THIS IS ODD! 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value === "true" ? true : false
    console.log(val)
    setOnSale(val)
  };

  const [updateProduct] = useMutation(UPDATE_PRODUCT_QUERY, { variables: {
    "updateProductId": id,
    "input": {
      "name": name,
      "description": description,
      "image": image,
      "onSale": onSale,
      "price": price,
      "quantity": quantity
    }
  } 
})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
    {data && 
      <Container>
        <Typography 
          variant='h6'
          component='h2'
          color='textSecondary'
          gutterBottom
        >
          Edit Product
        </Typography>
        <form noValidate autoComplete='off' onSubmit={(e) => {
          e.preventDefault()
          console.log(name)
          updateProduct()
          navigate("/")
        }}>
          {/* PRODUCT NAME  */}
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label='product name'
            variant='outlined'
            color='secondary'
            margin='normal'
            fullWidth
            required
          />
          {/* PRODUCT DESCRIPTION  */}
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label='product description'
            variant='outlined'
            color='secondary'
            margin='normal'
            fullWidth
            required
          />
          {/* PRODUCT PRICE  */}
          <FormControl fullWidth sx={{ m: 1 }} style={{marginLeft: 0}}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              type='number'
              inputProps={{
                maxLength: 13,
                step: "1"
              }}
              id="outlined-adornment-amount"
              value={price}
              onChange={(e) => setPrice((parseFloat(e.target.value)))}
              required
              startAdornment={<InputAdornment position="start">£</InputAdornment>}
              label="Amount"
            />

          </FormControl>
          {/* PRODUCT QUANTITY  */}
          <TextField
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            label='product quantity'
            variant='outlined'
            color='secondary'
            margin='normal'
            fullWidth
            required
          />
          {/* ON SALE  */}
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">On Sale?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={onSale}
              onChange={handleChange}
              defaultValue={false}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {/* PRODUCT IMAGE  */}
          <TextField
            value={image}
            label='product image'
            variant='outlined'
            color='secondary'
            margin='normal'
            fullWidth
            required
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ display: 'flex', marginTop: 1, marginBottom: 2 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    
    }
    </>
  )
}
 
export default EditProduct;