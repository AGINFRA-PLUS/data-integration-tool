import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import RFTextField from '../atoms/RFTextField';
import RFCheckbox from '../atoms/RFCheckbox';
import RFRadioButton from '../atoms/RFRadioButton';
import RFSelectBox from '../atoms/RFSelectBox';
import CustomForm from '../molecules/CustomForm';
import { METADATA_STEP_NAME } from '../../EN_Texts';
import RFMultiInput from '../atoms/RFMultiInput';

//async validate
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const asyncValidate = (values /*, dispatch */) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw { email: 'Email already Exists' };
        }
    });
};

//sync validate
const validate = (values, props) => {
    const errors = {};
    const requiredFields = props.fields.filter(field => field.required).map(field => field.name);
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};
const getFieldComponent = type => {
    switch (type) {
        case 'TextField':
            return RFTextField;
        case 'RadioButton':
            return RFRadioButton;
        case 'SelectBox':
            return RFSelectBox;
        case 'Checkbox':
            return RFCheckbox;
        case 'MultiInput':
            return RFMultiInput;
        default:
            return null;
    }
};
const MetaFormEditor = ({ fields }) => {
    const items = fields.map(field => ({ ...field, component: getFieldComponent(field.type) }));
    return (
        <center>
            <CustomForm items={items} submitLabel={'send'} clearLabel={'clear'} />
        </center>
    );
};
MetaFormEditor.propTypes = {
    fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default reduxForm({
    form: METADATA_STEP_NAME, // a unique identifier for this form
    validate,
})(MetaFormEditor);
