import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return ( 
    <Grid item xs={12} style={{textAlign: 'center', paddingLeft: 0}}>
      <Link to="/"><h1>e-Commerce Shop</h1></Link>
    </Grid>
  );
}
 
export default Header;