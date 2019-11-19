import { JellyfishSpinner } from 'react-spinners-kit';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useTheme } from '@material-ui/core';

const Loader = () => {
    const theme = useTheme();
    const mainColor = theme.palette.primary.main;
    return (
        <Box>
            <center>
                <JellyfishSpinner size={200} color={mainColor} />
                <br />
                Loading...
            </center>
        </Box>
    );
};

export default Loader;
