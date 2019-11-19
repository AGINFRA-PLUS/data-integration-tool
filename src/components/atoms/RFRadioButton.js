import FormControl from '@material-ui/core/FormControl/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import React from 'react';

const RFRadioButton = ({ input, items, ...rest }) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            {items.map((item, index) => (
                <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.name} />
            ))}
        </RadioGroup>
    </FormControl>
);

export default RFRadioButton;
