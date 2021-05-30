import React, {useState} from 'react';
import '../../styles/templates/collection.scss'

const ProductCard = (props) => {
    const {item} = props
    const {title, variants} = item;
    const [image, setImage] = useState(variants[0].image.src)

    // console.log('variants', variants[0].image.src)

    return(
    <div>
        <div className="product-image">
            <img src={image} width={200} />
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