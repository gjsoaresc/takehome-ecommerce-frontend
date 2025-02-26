import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

type ProductCardProps = {
  product: {
    id: number
    name: string
    price: number
    imageUrl: string
    brand: string
  }
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 420,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}))

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: 16,
  '&:last-child': {
    paddingBottom: 16,
  },
})

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      />
      <StyledCardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} - ${product.price}
        </Typography>
      </StyledCardContent>
      <CardActions sx={{ padding: 2, mt: 'auto' }}>
        {' '}
        {/* Ensures button sticks to bottom */}
        <Button fullWidth color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </StyledCard>
  )
}
