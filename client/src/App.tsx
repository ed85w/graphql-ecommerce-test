import './App.css';
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

export interface IProps {
  product: {
    id: string
    name: string  
    description: string
    quantity: number
    price: number
    image: string
    onSale: boolean
    category: string
    reviews: IProps["review"][]
    getAvgRating?: () => number
  },
  products: {
    id: string
    name: string  
    description: string
    quantity: number
    price: number
    image: string
    onSale: boolean
    category: string
    reviews: IProps["review"][]
  }[],
  review: {
    id: string
    date?: string
    rating: number
    comment?: string
  },
  reviews: {
    id: string
    date?: string
    rating: number
    comment?: string
  }[]
}

function App() {

  return (
    <Grid 
      container 
      spacing={4}
      justifyContent="center"
    >
      <Header />
      <Outlet/>
      <Footer />
    </Grid>
  );
}

export default App;
