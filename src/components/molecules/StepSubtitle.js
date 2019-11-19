import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    margin: 10px;
    margin-bottom: 20px;
`;
const StepSubtitle = ({ subtitle }) => (
    <Container>
        <Typography align={'center'} color={'secondary'}>
            {subtitle}
        </Typography>
    </Container>
);
StepSubtitle.propTypes = {
    subtitle: PropTypes.string,
};

export default StepSubtitle;
