import { useState, useEffect } from 'react';

// MUI
import {
    Grid,
    Typography,
    TextField,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    SelectChangeEvent,
    InputAdornment,
    IconButton,
} from '@mui/material';

// Icons
import { Search } from '@mui/icons-material';

// Utitlies
import SortIcon from '@mui/icons-material/Sort';
import { Product, sortOptionType } from './types/ProductTypes';
import Loader from './components/Loader';
import ProductListCard from './ProductListCard';


export const sortStates: sortOptionType[] = [
    { id: 'priceLowToHigh', value: 'Price: Low To High' },
    { id: 'priceHighToLow', value: 'Price: High To Low' }
]

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[] | []>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Product data fetching on initial render
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json() as Product[];
                const categories = data.map(x => x.category).filter((v, i, a) => i === a.indexOf(v));
                setCategories(categories);
                setProducts(data);
            }
            catch (error) {
                alert("Error occured while getting the data");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on category
    useEffect(() => {
        sortOption === 'priceLowToHigh' ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);
        if (categoryFilter === '') {
            setFilteredProducts(products);
        }
        else {
            const filtered = products.filter(
                (product) => product.category === categoryFilter
            );
            setFilteredProducts(filtered);
        }
    }, [categoryFilter, products]);

    // Filter products based on search term
    useEffect(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSort = (e: SelectChangeEvent<string>) => {
        const sortValue = e.target.value;
        switch (sortValue) {
            case 'priceLowToHigh':
                setFilteredProducts([...filteredProducts.sort((a, b) => a.price - b.price)])
                break;
            case 'priceHighToLow':
                setFilteredProducts([...filteredProducts.sort((a, b) => b.price - a.price)])
                break;
            default:
                break;
        }
        setSortOption(sortValue);
    }

    return (
        <>
            <Loader loading={isLoading} />
            <Grid container spacing={4} padding={8}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Typography variant="h3" component="div" style={{ display: 'flex', justifyContent: 'center' }} >
                        eCommerce
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12} className='stickyHeader'>
                    <Grid container spacing={2} width={'100%'}>
                        <Grid item xs={12} md={7} lg={8} xl={8}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                InputProps={{
                                    endAdornment: (<InputAdornment position='start'><IconButton><Search /></IconButton></InputAdornment>)
                                }}
                                onChange={(e: any) => setSearchTerm(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={2.5} lg={2} xl={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryFilter}
                                    onChange={(e: any) => setCategoryFilter(e.target.value)}
                                    label="Category"
                                >
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2.5} lg={2} xl={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Sort Products</InputLabel>
                                <Select
                                    value={sortOption}
                                    onChange={handleSort}
                                    IconComponent={SortIcon}
                                    className='sortIcon'
                                    label='Sort Products'
                                >
                                    {sortStates.map((sortState) => (
                                        <MenuItem key={sortState.id} value={sortState.id}>
                                            {sortState.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <ProductListCard products={filteredProducts} />
            </Grid>
        </>
    );
};

export default ProductListingPage;
