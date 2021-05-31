import React, {useState, useEffect} from 'react';
import {ButtonBase} from '@material-ui/core';

import '../../styles/templates/collection.scss'


const ProductCard = (props) => {
    const {item} = props
    const {title, variants, options} = item;
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(variants[index].image.src);
    const [price, setPrice] = useState(variants[index].price);
    const [comparePrice, setComparePrice] = useState(variants[index].compareAtPrice);
    const [colors, setColors] = useState([]);
    const [selected, setSelected] = useState('unselected')
    
    const renameColors = () => {
        const newColors = options[0].values
        const colorArray = []
        for (const color of newColors) {
            switch (color){ 
                case 'Blue': 
                    colorArray.push('blue'); 
                    break; 
                case 'Red': 
                    colorArray.push('red'); 
                    break; 
                case 'Gold': 
                    colorArray.push('gold'); 
                    break; 
                case 'Brown': 
                    colorArray.push('brown'); 
                    break; 
                case 'Medium Grey': 
                    colorArray.push('mediumgrey'); 
                    break; 
                case 'Navy': 
                    colorArray.push('navy'); 
                    break; 
                case 'Navy Blue': 
                    colorArray.push('navy'); 
                    break; 
                case 'Yellow': 
                    colorArray.push('yellow'); 
                    break; 
                case 'Dark Wash': 
                    colorArray.push('darkwash'); 
                    break; 
                case 'Light Wash': 
                    colorArray.push('lightwash'); 
                    break; 
                default: colorArray.push(color) 
                    break;
            }
        }
        setColors(colorArray)
    }

    useEffect(() => {
        renameColors();
    }, [])

    const handleClick = (swatch) => {
        console.log(swatch)
        // let selection = variants.find(variant => 
        //     variant.image.src.includes(swatch)
        // )
        // setImage(selection.image.src);
        // setPrice(selection.price);
        // setComparePrice(selection.compareAtPrice);
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
                        <s>{price}</s><span id="discount">{comparePrice}</span>
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
                <span id={swatch} className={selected}></span>
            </ButtonBase>
                
                )}
        </div>
    </div>
    )
}

export default ProductCard