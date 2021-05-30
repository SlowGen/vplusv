import React, {useState} from 'react';

const ProductCard = (props) => {
    const {item} = props
    const {title, variants} = item;
    const [image, setImage] = useState(variants[0].image.src)

    // console.log('variants', variants[0].image.src)

    return(
    <div>
        <div className="product-image">
            <img src={image} />
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