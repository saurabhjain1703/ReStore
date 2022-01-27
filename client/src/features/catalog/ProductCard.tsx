import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/Product";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{bgcolor:'secondary.main'}}>{product.type.charAt(0).toUpperCase()}</Avatar>}
          title={product.name} 
          titleTypographyProps={{
            sx:{fontWeight:'bold', color:'primary.light'}
          }}
        />
        <CardMedia
          sx={{height : 140, backgroundSize:'contain', bgcolor:'silver'}}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
          ₹{(product.price / 100 ).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </>
  );
}
