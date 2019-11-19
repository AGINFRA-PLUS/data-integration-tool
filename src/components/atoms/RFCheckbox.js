import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import React from 'react';

const RFCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} />} label={label} />
    </div>
);

export default RFCheckbox;
