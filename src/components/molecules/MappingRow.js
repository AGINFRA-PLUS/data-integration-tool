import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import React from 'react';
import PropTypes from 'prop-types';
import SelectedIcon from '@material-ui/icons/CheckCircle';
import { useTheme } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

import SelectBox from '../atoms/SelectBox';

import AutosuggestRemote from './AutosuggestRemote';

const MappingRow = ({ isSelected, header, preview, properties, selectedProperty, onChange }) => {
    const theme = useTheme();
    const successColor = theme.palette.success.dark;
    let api = null,
        autocomplete = null,
        filter = null,
        label = null;
    if (selectedProperty) {
        api = selectedProperty.api;
        autocomplete = !!selectedProperty.autocomplete;
        label = selectedProperty.label;
        filter = selectedProperty.filter;
    }

    return (
        <TableRow>
            <Hidden xsDown>
                <TableCell>{isSelected && <SelectedIcon htmlColor={successColor} />}</TableCell>
            </Hidden>
            <TableCell>{header}</TableCell>
            <Hidden xsDown>
                <TableCell>{preview}</TableCell>
            </Hidden>
            <TableCell>
                <SelectBox items={properties} givenValue={label} onChange={onChange} />
                {autocomplete && (
                    <AutosuggestRemote
                        url={api}
                        filter={filter}
                        placeholder={'Name of the measured trait'}
                        onChange={value => {
                            console.log(value);
                        }}
                    />
                )}
            </TableCell>
        </TableRow>
    );
};
MappingRow.propTypes = {
    isSelected: PropTypes.bool,
    header: PropTypes.string,
    preview: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedProperty: PropTypes.string,
    properties: PropTypes.array,
    onChange: PropTypes.func,
};

export default MappingRow;
