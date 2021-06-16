import React, {useEffect, useState} from 'react';
import getAllProducts from '../graphql/collection-starter-code';
import {Grid} from '@material-ui/core';

import ProductCard from './ProductCard'
import Header from './Header'

import '../../styles/templates/collection.scss'

const Collection = () => {
    const [products, setProducts] = useState([])
    const [sortMetric, setSortMetric] = useState('default')
    
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

    const handleSelector = (e) => {
        e.preventDefault();
        setSortMetric(e.target.value);
    }

    const sortedProducts = products.sort((a,b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        const aTitle = a.title
        const bTitle = b.title
        const aPrice = a.variants[0].availableForSale ? Number(a.variants[0].price) : -Infinity
        const bPrice = b.variants[0].availableForSale ? Number(b.variants[0].price) : -Infinity
        switch (sortMetric) {
            case 'newest':
                if (aDate.getTime() > bDate.getTime()) return 1
                if (aDate.getTime() < bDate.getTime()) return -1
                else return 0
            case 'ascendingAZ':
                if (aTitle > bTitle) return 1
                if (aTitle < bTitle) return -1
                else return 0
            case 'descendingZA':
                if (aTitle < bTitle) return 1
                if (aTitle > bTitle) return -1
                else return 0
            case 'ascPrice':
                if (aPrice > bPrice) return 1
                if (aPrice < bPrice) return -1
                else return 0
            case 'descPrice':
                //TODO solve "out of stock" sorting
                if (aPrice < bPrice) return 1
                if (aPrice > bPrice) return -1
                else return 0
            default:
                if (aDate.getTime() < bDate.getTime()) return 1
                if (aDate.getTime() > bDate.getTime()) return -1
                else return 0
        }
    })
    
    return(
        <div>
            <div id="head-component">
                <Header />
            </div>
            <div id="sort">
                <span>{products.length} results</span>
                <select className="input--dropdown" onChange={handleSelector}>
                    <option value="sort">Sort</option> 
                    <option value="newest">Newest Arrival</option>
                    <option value="ascendingAZ">A - Z</option>
                    <option value="descendingZA">Z - A</option>
                    <option value="ascPrice">Price Low to High</option>
                    <option value="descPrice">Price High to Low</option>
                </select>
            </div>
            
            <Grid container direction="row" justify="center" align="center"
            alignItems="center" spacing={2}>
                {sortedProducts.map(item =>
                    <Grid item sm={6} md={4} lg={3} key={item.id} >  
                        <ProductCard item={item}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Collection;
