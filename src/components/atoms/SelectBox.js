import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import TooltipedSelectItem from './TooltipedSelectItem';

/*
 * @prop givenValue: The default value given from parent
 * @prop items: The items on the list. They contain the label, the value and the required option
 * @prop onChange: The callback to be called when a change occurs
 */

const SelectBox = ({ givenValue, items, onChange }) => {
    const [value, setValue] = useState(givenValue ? givenValue : null);
    const handleChange = event => {
        const { value } = event.target;
        setValue(value);
        onChange(value);
    };
    return (
        <FormControl>
            <Select autoWidth={true} displayEmpty value={value} onChange={handleChange}>
                {items.map(
                    (item, i) =>
                        item && (
                            <MenuItem key={i} value={item ? item.value : null}>
                                <TooltipedSelectItem
                                    overlay={item ? item.description : ''}
                                    itemValue={
                                        <div>
                                            <span>{item ? item.label : 'None'}</span>
                                            {item.required && (
                                                <Box display={'inline-block'} marginLeft={'6px'} color={'red'}>
                                                    &#8226;
                                                </Box>
                                            )}
                                        </div>
                                    }
                                />
                            </MenuItem>
                        ),
                )}
            </Select>
        </FormControl>
    );
};
SelectBox.propTypes = {
    givenValue: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
};

export default SelectBox;
