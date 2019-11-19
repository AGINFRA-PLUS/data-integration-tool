import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';

const RFTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField label={label} placeholder={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />
);

export default RFTextField;
