import React from 'react';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button/Button';

import { FINISH_TEXT } from '../../EN_Texts';

const FinishButton = props => {
    return (
        <Button variant="outlined" float={'right'} {...props}>
            {FINISH_TEXT} &nbsp; <Send />
        </Button>
    );
};

export default FinishButton;
