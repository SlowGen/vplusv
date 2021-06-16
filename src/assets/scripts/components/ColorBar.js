import React, {useState, useEffect} from 'react';

import '../../styles/templates/collection.scss'

const ColorBar = (props) => {
    const {colorArray, id, title, makeChange} = props

    return(
        <div>
                    {colorArray.map((swatch) => (
                        <span key={id+swatch}>
                            <input name={title} type="radio" 
                                id={swatch} value={swatch} 
                                onChange={makeChange} 
                                />
                            <label htmlFor={swatch}><span className={swatch}></span></label>
                        </span>
                    ))}
                </div>
    )
}

export default ColorBar