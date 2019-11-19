import Dialog from '@material-ui/core/Dialog/Dialog';
import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import PropTypes from 'prop-types';
import '../../../node_modules/loaders.css/loaders.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const RemoveItemDialog = ({ open, item, onRemove, handleModal }) => {
    const handleClose = () => {
        handleModal(false);
    };
    const handleDelete = () => {
        onRemove(item.id); //give the item id to remove and the callback to close the modal
        handleClose();
    }
    return (
        <Dialog onClose={handleClose} aria-labelledby="sending-to-server-dialog" open={open}>
            <DialogTitle id="sending-to-server-dialog-title">Remove item</DialogTitle>
            <DialogContent>
                Are you sure you want to remove {item.title} ?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    No
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RemoveItemDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    handleModal: PropTypes.func,
};

export default RemoveItemDialog;
