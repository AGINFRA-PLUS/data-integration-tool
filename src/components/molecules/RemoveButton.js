import React from 'react';
import Button from '@material-ui/core/Button/Button';
import RemoveIcon from '@material-ui/icons/Delete';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#69696a',
            main: '#c31632',
            dark: '#1e1e1f',
        },
        secondary: {
            light: '#fff5f8',
            main: '#526c91',
            dark: '#33475b',
        },
    },
});

const RemoveButton = props => {
    return (
        <ThemeProvider theme={theme}>
            <Button color={'primary'} variant={'contained'} {...props}>
                <RemoveIcon />
            </Button>
        </ThemeProvider>
    );
};

export default RemoveButton;
