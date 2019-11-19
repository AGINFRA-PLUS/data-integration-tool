import React, { useEffect } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Box from '@material-ui/core/Box/Box';
import PropTypes from 'prop-types';

import SelectableCard from '../atoms/SelectableCard';

const SelectableGroup = ({ selectables, selected, onChange }) => {
    const [value, setValue] = React.useState('female');

    useEffect(() => {
        if (selected) setValue(selected);
    }, []);

    function handleChange(event) {
        const { value } = event.target;
        setValue(value);
        if (onChange) onChange(value);
    }

    return (
        <Box textAlign={'center'}>
            {selectables && (
                <RadioGroup style={{ justifyContent: 'center', flexDirection: 'row' }} name="selectableGroup" value={value} onChange={handleChange}>
                    {selectables.map((selectable, index) => (
                        <FormControlLabel
                            key={index}
                            label={''}
                            style={{ flex: '1 1 0%', margin: '10px', maxWidth: '250px', alignItems: 'normal' }}
                            value={selectable.value}
                            control={<SelectableCard title={selectable.name} subtitle={selectable.text} image={selectable.image} selected={value === selectable.value} />}
                        />
                    ))}
                </RadioGroup>
            )}
        </Box>
    );
};

SelectableGroup.propTypes = {
    selectables: PropTypes.array,
    selected: PropTypes.node,
    onChange: PropTypes.func,
};

export default SelectableGroup;
