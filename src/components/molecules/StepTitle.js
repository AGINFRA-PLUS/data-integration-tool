import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import PropTypes from 'prop-types';

const StepTitle = ({ title }) => (
    <Typography align={'center'} variant={'h4'}>
        {title}
    </Typography>
);
StepTitle.propTypes = {
    title: PropTypes.string,
};

export default StepTitle;
