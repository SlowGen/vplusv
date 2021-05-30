import React, {useState} from 'react';

const ProductCard = (props) => {
    const {item} = props
    const {title, variants} = item;

    return(
    <div>
        <div className="product-image">
            <img src={variants[0].image} />
        </div>
        <div>
            {title}
        </div>
        <div>
            {variants[0].price}
        </div>
    </div>
    )
}

export default ProductCard