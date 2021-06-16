import React, {useState} from 'react';
import ToggleButtonStyled from './ToggleButton'
import ToggleGroupStyled from './ToggleGroupStyled'

import '../../styles/templates/collection.scss'


const ProductCard = (props) => {
    const {item} = props
    const {title, variants, options, id} = item;
    const price = variants[0].price;
    const comparePrice = variants[0].compareAtPrice;
    const available = variants[0].availableForSale;

    const colorNames = new Map([['Blue', 'blue'], ['Red', 'red'], ['Gold', 'gold'], ['Brown', 'brown'], 
        ['Medium Grey', 'mediumgrey'], ['Navy', 'navy'], ['Navy Blue', 'navy'], 
        ['Yellow', 'yellow'], ['Dark Wash', 'darkwash'], ['Light Wash', 'lightwash']])

    const optionsMap = new Map();
    for (const option of options) {
        const key = option.name
        let value = new Set()
        
        for (const opt of option.values) {
            if (option.name === 'Color') value.add(colorNames.get(opt))
            else value.add(opt)
        }
        optionsMap.set(key, value)
    }

    const imageSet = new Set();
    for (const variant of variants) {
        imageSet.add(variant.image.src)
    }
    const colorArray = optionsMap.has('Color') ? Array.from(optionsMap.get('Color')) : ['default']
    const imageMap = makeMapHelper(colorArray, Array.from(imageSet))

    const [image, setImage] = useState(imageMap.get('default'));
    const [selectedSwatch, setSelectedSwatch] = useState(colorArray[0])

    const handleChange = (e, swatch) => {
        e.preventDefault();
        if (swatch !== selectedSwatch && swatch !== null) {
            setSelectedSwatch(swatch)
            setImage(imageMap.get(swatch));
        } 
    }

    return(
    <div>
        <div>
            <img src={image} id={"product-image"} />
        </div>
        <div>
            {title}
        </div>
        <div>
            {available ?
                comparePrice ?
                    (
                        <div id="pricebox">
                            <s>${comparePrice}</s><span id="discount">${price}</span>
                        </div>
                    ) : (
                        <div>
                            ${price}
                        </div>
                    ) 
                : (
                    <div id="pricebox">
                        Out of Stock
                    </div>
                )
            
            }
        </div>
        <ToggleGroupStyled  exclusive value={selectedSwatch} onChange={handleChange} >
            {colorArray.map(swatch =>
                <ToggleButtonStyled key={id+swatch} value={swatch} name={swatch} size="medium" id={swatch}>
                    <span name={swatch} key={swatch} ></span>
                </ToggleButtonStyled>
                
            )}
        </ToggleGroupStyled>
    </div>
    )
}

function makeMapHelper (keyArray, valueArray) {
    const map = new Map()
    map.set('default', valueArray[0])
    if (keyArray.length) {
        for (let i=0; i<keyArray.length; i++) {
            map.set(keyArray[i], valueArray[i])
        }
    }
    return map
}

export default ProductCard