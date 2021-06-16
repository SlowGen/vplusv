import React, {useState, useEffect} from 'react';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {withStyles} from '@material-ui/core/styles'

import '../../styles/templates/collection.scss'


const ProductCard = (props) => {
    const {item} = props
    const {title, variants, options, id, createdAt} = item;
    const price = variants[0].price;
    const comparePrice = variants[0].compareAtPrice;

    const colorTranslator = new Map([['blue', '#00BCD3'], ['red', '#EF5350'], ['gold', '#FEC109'], ['brown', '#AF806E'], 
        ['mediumgrey', '#CDCDCD'], ['navy', '#2F3676'], ['yellow', '#FEC109'], ['darkwash', '#2F3676'], ['lightwash', '#00BCD3']])

    const colorNames = new Map([['Blue', 'blue'], ['Red', 'red'], ['Gold', 'gold'], ['Brown', 'brown'], 
        ['Medium Grey', 'mediumgrey'], ['Navy', 'navy'], ['Navy Blue', 'navy'], 
        ['Yellow', 'yellow'], ['Dark Wash', 'darkwash'], ['Light Wash', 'lightwash']])

    const CustomToggle = withStyles((swatch) => ({
        root: {
            boxSizing: 'content-box',
            borderRadius: '50%',
            borderStartEndRadius: '50%',
            height: '35px',
            width: '35px',
            backgroundColor: colorTranslator.get(swatch),
    
        },
        label: {
            display: 'inline-block',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
        }
    }))(props => <ToggleButton {...props} />)
    
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
    const [selectedSwatch, setSelectedSwatch] = useState('default')

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
            {comparePrice ?
                (
                    <div id="pricebox">
                        <s>${comparePrice}</s><span id="discount">${price}</span>
                    </div>
                ) : (
                    <div>
                        ${price}
                    </div>
                )
            }
        </div>
        <ToggleButtonGroup  exclusive value={selectedSwatch} onChange={handleChange} >
            {colorArray.map(swatch =>
            <CustomToggle key={id+swatch} value={swatch} name={swatch} size="small" className='toggle' id={swatch}>
                <span name={swatch} key={swatch} id={swatch}></span>
            </CustomToggle>
                
                )}
        </ToggleButtonGroup>
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