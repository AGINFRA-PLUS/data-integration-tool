import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const Header = ({ logo }) => {
    return (
        <Paper padding={'10px'} style={{ borderRadius: '0px' }}>
            {logo && <img alt={'logo'} src={logo} style={{ height: '50px', margin: '6px 20px' }} />}
            <Box display={'inline-block'} margin={'5px'} style={{ float: 'right' }}>
            </Box>
        </Paper>
    );
};
Header.propTypes = {
    logo: PropTypes.string,
};

export default Header;
