import { Card, CardContent, Skeleton } from '@mui/material'
import { Grid } from '@mui/system'

export const ProductSkeleton = () => {
  return (
    <Grid container spacing={2} flex={1}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
