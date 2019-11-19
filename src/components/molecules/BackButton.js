import React from 'react';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button/Button';

import { BACK_TEXT } from '../../EN_Texts';

const BackButton = props => {
    return (
        <Button color={'primary'} variant="outlined" float={'left'} {...props}>
            <NavigateBefore /> {BACK_TEXT}
        </Button>
    );
};

export default BackButton;
