import type React from "react"
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material"

interface ListingCardProps {
  title: string
  imageUrl: string
  description: string
  price: number
}

const ListingCard: React.FC<ListingCardProps> = ({ title, imageUrl, description, price }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Price: ${price}</Typography>
      </Box>
    </Card>
  )
}

export default ListingCard
