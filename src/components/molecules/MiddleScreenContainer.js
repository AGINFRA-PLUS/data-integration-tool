import Box from '@material-ui/core/Box/Box';
import Container from '@material-ui/core/Container/Container';
import React from 'react';
import PropTypes from 'prop-types';

const MiddleScreenContainer = ({ children }) => (
    <Container style={{ height: '100%' }}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
            <Box flex={'1 1 0%'} maxHeight={'100%'}>
                {children}
            </Box>
        </Box>
    </Container>
);
MiddleScreenContainer.propTypes = {
    children: PropTypes.node,
};
export default MiddleScreenContainer;
