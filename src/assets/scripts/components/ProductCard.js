import React, {useState, useEffect} from 'react';
import {ButtonBase} from '@material-ui/core';

import '../../styles/templates/collection.scss'


const ProductCard = (props) => {
    const {item} = props
    const {title, variants, options} = item;
    const [colors, setColors] = useState([]);
    const [images, setImages] = useState([]);

    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(variants[index].image.src);
    const [price, setPrice] = useState(variants[index].price);
    const [comparePrice, setComparePrice] = useState(variants[index].compareAtPrice);
    const [selected, setSelected] = useState('unselected')
    const colorMap = new Map([['Blue', 'blue'], ['Red', 'red'], ['Gold', 'gold'], ['Brown', 'brown'], 
        ['Medium Grey', 'mediumgrey'], ['Navy', 'navy'], ['Navy Blue', 'navy'], 
        ['Yellow', 'yellow'], ['Dark Wash', 'darkwash'], ['Light Wash', 'lightwash']])
    
    const setupImagesAndColors = () => {
        const colorOptions = options[0].name === 'Color' ? options[0].values : [];
        const colorArray = []
        for (const opt of colorOptions) {
            colorArray.push(colorMap.get(opt))
        }
        if (colorArray.length) setColors([...colorArray])
        
        const imageSet = new Set();
        for (const variant of variants) {
            imageSet.add(variant.image.src)
        }
        if (imageSet.size > 0) setImages(Array.from(imageSet))
    }

    useEffect(() => {
        setupImagesAndColors();
    }, [])

    const handleClick = (swatch) => {
        const indx = colors.findIndex(color => color === swatch)
        setIndex(indx)
        setImage(images[indx]);
        // setPrice();   ----not set up to change accurately yet
        // setComparePrice(); ---not set up to change accurately yet
    }

    return(
    <div>
        <div>
            <img src={image} width={200} />
        </div>
        <div>
            {title}
        </div>
        <div>
            {comparePrice ?
                (
                    <div id="pricebox">
                        <s>{comparePrice}</s><span id="discount">{price}</span>
                    </div>
                ) : (
                    <div>
                        {price}
                    </div>
                )
            }
        </div>
        <div>
            {colors.map(swatch =>
            <ButtonBase key={swatch} onClick={() => handleClick(swatch)} value="index" size="small" className="swatches" >
                <span id={swatch} className={selected} key={swatch}></span>
            </ButtonBase>
                
                )}
        </div>
    </div>
    )
}

export default ProductCard