import React, {useState, useEffect} from 'react';
import '../../styles/templates/collection.scss';


const Swatch = (props) => {
    const {swatch} = props
    const [color, setColor] = useState(swatch)

    useEffect(() => {
        switch (color) {
            case 'Medium Gray':
                setColor('Medium-Gray');
                break;
            case 'Dark Wash':
                setColor('Dark-Wash');
                break;
            case 'Light Wash':
                setColor('Light-Wash');
                break;
            default:
                break;
        } 
    }, [color])


    return(
        <span className="colors" id={color}>sl</span>
    )
}

export default Swatch