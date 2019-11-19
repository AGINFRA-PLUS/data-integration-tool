import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import React from 'react';

const RFMultiInput = ({ label, input }) => {
    return <ChipInput onChange={input.onChange} defaultValue={input.value} fullWidth label={label} placeholder="Type and press enter to add" />;
};
RFMultiInput.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
};

export default RFMultiInput;
