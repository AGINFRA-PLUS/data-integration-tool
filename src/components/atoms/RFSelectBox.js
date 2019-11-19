import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import RFFormHelper from './RFFormHelper';

const RFSelectBox = ({ input, label, meta: { touched, error }, items, ...custom }) => (
    <FormControl error={touched && error}>
        <Select
            {...input}
            {...custom}
            inputProps={{
                name: {label},
                id: {label},
            }}>
            {items.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
        {RFFormHelper({ touched, error })}
    </FormControl>
);

export default RFSelectBox;
