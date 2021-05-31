import React, {useState, useEffect} from 'react';
import {ButtonGroup, Button} from '@material-ui/core';

import '../../styles/templates/collection.scss';
import Swatch from './Swatch';


const ProductCard = (props) => {
    const {item} = props
    const {title, variants, options} = item;
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(variants[index].image.src);
    const [price, setPrice] = useState(variants[index].price);
    const [comparePrice, setComparePrice] = useState(variants[index].compareAtPrice);
    const [inStock, setInStock] = useState(variants[index].availableForSale)
    const [colors, setColors] = useState([]);
    const [selected, setSelected] = useState(false)
    
    const changeSwatch = () => {console.log('swap!')};

    const getColors = () => {
        const colorArray = []
        if (options[0].name === 'Color') {
            let cols = options[0].values
            for (let col of cols) {
                switch (col){
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
                    default:
                        colorArray.push(col)
                        break;
                }
            }
            
        }
        setColors(colorArray);
    }

    useEffect(() => {
        getColors();
    }, [])


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
            {colors.map(color => 
                        // <span className="colors" id={color} key={color}></span>
                    {color}
                )}
            {/* <ButtonGroup value="swatches" onChange={changeSwatch}>
                {colors.map(swatch => {
                    <Button value={swatch} selected={selected} >
                        <Swatch swatch={swatch} />
                        words
                    </Button>
                    }
                )}
            </ButtonGroup> */}
        </div>
    </div>
    )
}

export default ProductCard