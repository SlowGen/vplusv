import React from 'react';
import {ToggleButtonGroup} from '@material-ui/lab';
import {withStyles} from '@material-ui/core/styles'

const ToggleGroupStyled = withStyles(() => ({
    grouped: {
        '&:not(:first-child)': {
            borderRadius: '50%',
          },
          '&:first-child': {
            borderRadius: '50%',
          },
        margin: '7px'
    },
}))(props => <ToggleButtonGroup {...props} />)

export default ToggleGroupStyled