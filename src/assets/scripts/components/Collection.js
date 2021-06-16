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


    const handleSelector = () => {console.log('This is on the TODO list!')}
    

    return(
        <div>
            <select className="input--dropdown" onChange={handleSelector}>
                <option disabled="disabled" value="On the TODO List">Sort</option> 
                <option>Newest Arrival</option>
                <option>A - Z</option>
                <option>Z - A</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
            </select>
            
            <Grid container direction="row" justify="center" align="center"
            alignItems="center" spacing={2}>
                {products.map(item =>
                    <Grid item sm={6} md={4} lg={3} key={item.id} >  
                        <ProductCard item={item}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Collection;
