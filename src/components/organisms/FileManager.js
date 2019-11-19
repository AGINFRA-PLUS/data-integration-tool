import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import DownloadButton from '../molecules/DownloadButton';
import RemoveButton from '../molecules/RemoveButton';
import RemoveItemDialog from '../molecules/RemoveItemDialog';
import ShowStreamButton from '../molecules/ShowStreamButton';
import { getSelectedItem } from '../../redux/selectors/fileManagementSelectors';
import { setSelectedItem } from '../../redux/actions/fileManagementActions';
import Hidden from '@material-ui/core/Hidden';

const FileManager = ({ items, handleDatasetDownload, handleStreamShow, handleDelete }) => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(getSelectedItem);
    const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
    const handleRemoveButtonClick = item => {
        console.log(item);
        dispatch(setSelectedItem(item));
        setTimeout(()=>{console.log(selectedItem);},1000);

        setDeleteDialogOpened(true);
    };
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <Hidden xsDown><TableCell align="center">Description</TableCell></Hidden>
                        <Hidden xsDown><TableCell align="center">Created</TableCell></Hidden>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items &&
                        items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                <TableCell align="center">{item.entityType.substring(9)}</TableCell>
                                <Hidden xsDown><TableCell align="center">{item.description}</TableCell></Hidden>
                                <Hidden xsDown><TableCell align="center">{new Date(item.createdOn).toISOString().slice(0, 10)}</TableCell></Hidden>
                                <TableCell align="right">
                                    {item.entityType === 'internal_dataset' ? (
                                        <DownloadButton rowid={item.id} onDownload={handleDatasetDownload} />
                                    ) : (
                                        <ShowStreamButton rowid={item.id} onShowStream={handleStreamShow} />
                                    )}
                                    <RemoveButton
                                        onClick={() => {
                                            handleRemoveButtonClick(item);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {selectedItem && <RemoveItemDialog onRemove={handleDelete} handleModal={setDeleteDialogOpened} open={deleteDialogOpened} item={selectedItem} />}
        </div>
    );
};
FileManager.propTypes = {
    items: PropTypes.array,
    handleDatasetDownload: PropTypes.func,
    handleStreamShow: PropTypes.func,
    handleDelete: PropTypes.func,
};

export default FileManager;
