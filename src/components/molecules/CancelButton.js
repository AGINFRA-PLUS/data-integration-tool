import React from 'react';
import Button from '@material-ui/core/Button/Button';

import { CANCEL_TEXT } from '../../EN_Texts';

const CancelButton = props => {
    return (
        <Button color={'secondary'} float={'left'} {...props}>
            {CANCEL_TEXT}
        </Button>
    );
};

export default CancelButton;
