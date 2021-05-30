import React, {useEffect, useState} from 'react';
import getAllProducts from '../graphql/collection-starter-code';
import {Grid} from '@material-ui/core';

import ProductCard from './ProductCard'

const Collection = () => {
    const [products, setProducts] = useState([])
    const collectionName = 'test-collection'
    
    useEffect(() => {
        (async () => {
            try {
                const data = await getAllProducts(collectionName)
                setProducts(data)
            } catch (error) {
                console.log('error loading data', error)
            }
        })()
    }, []
    )
    console.log('data', products)
    const handleSelector = () => {console.log('none')}
    return(
        <div>
            <select className="input--dropdown" onChange={handleSelector}>
                <option disabled="disabled" value="">Sort</option> 
                <option>Newest Arrival</option>
                <option>A - Z</option>
                <option>Z - A</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
            </select>
            <Grid container={true} direction="row" justify="center" 
                alignItems="center" spacing={2}>
                {products.map(item =>
                    <Grid item={true} sm={12} md={6} lg={3} key={item.id} >
                        <ProductCard item={item} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Collection;
