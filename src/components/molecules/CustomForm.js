import Box from '@material-ui/core/Box/Box';
import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomForm = ({ items, handleSubmit }) => {
    return (
        <MyForm onSubmit={handleSubmit}>
            <Box>
                {items.map((item, i) => (
                    <Box padding={'10px'} minWidth={'300px'} key={i}>
                        <FixedWidthField name={item.name} component={item.component} label={item.label} items={item.items}>
                            {item.children}
                        </FixedWidthField>
                    </Box>
                ))}
            </Box>
        </MyForm>
    );
};
const FixedWidthField = styled(Field)`
    width: 100%;
`;
const MyForm = styled.form`
    display: inline-block;
    text-align: left;
`;
CustomForm.propTypes = {
    handleSubmit: PropTypes.func,
    items: PropTypes.array,
};

export default CustomForm;
