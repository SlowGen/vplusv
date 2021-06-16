import React from 'react';
import {ToggleButton} from '@material-ui/lab';
import {withStyles} from '@material-ui/core/styles'

const ToggleButtonStyled = withStyles(() => ({
    selected: {
        boxShadow: '0 0 0 3px white, 0 0 0 4px black',
    }
}))(props => <ToggleButton {...props} />)

export default ToggleButtonStyled