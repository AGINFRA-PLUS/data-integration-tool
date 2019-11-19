import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Grid from '@material-ui/core/Grid/Grid';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tab from '@material-ui/core/Tab/Tab';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';
import Hidden from '@material-ui/core/Hidden';

import { getUploadMappings } from '../../redux/selectors/mainSelectors';
import { getCurrentSheet, getCurrentSheetIndex, getFilename, getResourceSheetNames } from '../../redux/selectors/resourceSelectors';
import { setCurrentSheet } from '../../redux/actions/resourceActions';
import MappingRow from '../molecules/MappingRow';
import { setMapping } from '../../redux/actions/mainActions';
import { addSelectedProperty, removeSelectedProperty } from '../../redux/actions/mappingActions';
import { getAvailableProperties, getMappingProperties } from '../../redux/selectors/mappingSelectors';

const Mapper = () => {
    const dispatch = useDispatch();
    const fileName = useSelector(getFilename);
    const sheetNames = useSelector(getResourceSheetNames);
    const currentSheetIndex = useSelector(getCurrentSheetIndex);
    const currentSheet = useSelector(getCurrentSheet);
    const mappings = useSelector(getUploadMappings);
    const availableProperties = useSelector(getAvailableProperties);
    const allProperties = useSelector(getMappingProperties);

    const headers = currentSheet.length > 0 ? currentSheet[0] : [];
    const previews = currentSheet.length > 1 ? currentSheet[1] : [];

    const selectSheet = sheet => {
        dispatch(setCurrentSheet(sheet));
    };
    const setHeaderMapping = (header, value) => {
        //set mapping store
        if (mappings[header]) dispatch(removeSelectedProperty(mappings[header]));
        if (value) dispatch(addSelectedProperty(value));

        //set main store
        let mapping = {};
        mapping[header] = value;
        dispatch(setMapping(mapping));
    };

    return (
        <div>
            {sheetNames.length > 0 && (
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={currentSheetIndex}
                                onChange={(event, value) => {
                                    selectSheet(value);
                                }}
                                variant="fullWidth">
                                {sheetNames.map((name, i) => (
                                    <Tab key={i} label={sheetNames.length > 1 ? name : fileName} />
                                ))}
                            </Tabs>
                        </AppBar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Hidden xsDown>
                                        <TableCell>
                                            <b>SELECTED</b>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        <b>HEADER</b>
                                    </TableCell>
                                    <Hidden xsDown>
                                        <TableCell>
                                            <b>PREVIEW (the value of the first row)</b>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        <b>MATCHED PROPERTY</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {headers.map((header, i) => (
                                    <MappingRow
                                        key={header}
                                        isSelected={!!mappings[header]}
                                        header={header}
                                        preview={previews[i]}
                                        properties={[
                                            ...availableProperties,
                                            allProperties.find(prop => prop.value === mappings[header]),
                                            { value: null, label: 'None', description: 'The column will not be included' },
                                        ].filter(prop => prop)}
                                        selectedProperty={allProperties.find(prop => prop.label === mappings[header])}
                                        onChange={value => {
                                            setHeaderMapping(header, value);
                                        }}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default Mapper;
