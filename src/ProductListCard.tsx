import React from 'react'
import { Product } from './types/ProductTypes'

// MUI
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material'

// Utitlies
import { truncateText } from './utilities/Text';

interface ProductListCardProps {
    products: Product[];
}

const ProductListCard: React.FC<ProductListCardProps> = ({ products }) => {
    return (
        <>
            {products.map((product: Product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card className='productCard'>
                        <CardActionArea style={{ height: '100%', position: 'relative' }}>
                            <CardMedia
                                loading='lazy'
                                image={product.image}
                                alt={product.title}
                                component="img"
                                height={300}
                                width={400}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" >
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component="div"
                                >
                                    {truncateText(product.description, 320)}
                                </Typography>
                                <Typography variant="h6" component="div" style={{ position: 'absolute', bottom: 1 }}>
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </>
    )
}

export default ProductListCard