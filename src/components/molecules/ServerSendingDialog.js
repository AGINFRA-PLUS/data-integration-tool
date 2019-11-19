import Dialog from '@material-ui/core/Dialog/Dialog';
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { Loader } from 'react-loaders';
import PropTypes from 'prop-types';
import '../../../node_modules/loaders.css/loaders.css';
import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';

const ServerSendingDialog = ({ open }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const handleClose = () => {};
    return (
        <Dialog onClose={handleClose} aria-labelledby="sending-to-server-dialog" open={open}>
            <DialogTitle id="sending-to-server-dialog-title">Sending to server</DialogTitle>
            <Box padding={'20px'}>
                <center>
                    <Loader type={'line-scale'} active color={primaryColor} />
                </center>
            </Box>
        </Dialog>
    );
};

ServerSendingDialog.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default ServerSendingDialog;
