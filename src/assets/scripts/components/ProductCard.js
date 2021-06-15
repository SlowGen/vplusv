import React, {useState, useEffect} from 'react';
// import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab' 

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
    const [selectedSwatch, setSelectedSwatch] = useState('')
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
        setSelectedSwatch(colors[0]);
    }, [])

    const handleChange = (swatch) => {
        console.log('swatch', swatch)
        if (swatch !== selectedSwatch) {
            const indx = colors.findIndex(color => color === swatch)
            setSelectedSwatch(swatch)
            setIndex(indx)
            setImage(images[indx]);
            setPrice(variants[index].price);   //not set up to change accurately yet
            setComparePrice(variants[index].compareAtPrice); //not set up to change accurately yet
        } 
    }

    return(
    <div>
        <div>
            <img src={image} width={"33%"} />
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
                {colors.map((swatch) => (
                    <span key={swatch}>
                        <input name="color-swatch" type="radio" 
                            id={swatch} value={swatch} 
                            onChange={() => handleChange(swatch)} 
                            />
                        <label htmlFor={swatch}><span className={swatch}></span></label>
                    </span>
                ))}
    </div>
    )
}

export default ProductCard