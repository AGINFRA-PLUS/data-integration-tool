import React from 'react';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button/Button';

import { NEXT_TEXT } from '../../EN_Texts';

const NextButton = props => {
    return (
        <Button color={'primary'} variant="outlined" float={'right'} {...props}>
            {NEXT_TEXT} <NavigateNext />
        </Button>
    );
};

export default NextButton;
