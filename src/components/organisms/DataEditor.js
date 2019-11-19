import { AgGridReact } from 'ag-grid-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getColumnDefs, getDataArray } from '../../redux/selectors/resourceSelectors';
import { getCommunity, getUploadObjects } from '../../redux/selectors/mainSelectors';
import { setAgGridDataArray } from '../../redux/actions/resourceActions';
import AgGridValidator from '../../utils/AgGridValidator';

import '../../styles/ag-grid-extra.css';
import { setDataEditorValidation } from '../../redux/actions/mainActions';

var gridApi = null;
const DataEditor = () => {
    const dispatch = useDispatch();

    // have been inited on Mapper =selectedCols> onNext()
    const objectType = useSelector(getUploadObjects);
    const community = useSelector(getCommunity);
    const colDefs = useSelector(getColumnDefs);
    const dataArray = useSelector(getDataArray);

    useEffect(() => {
        const numberOfInvalidCells = document.getElementsByClassName('invalid-cell').length;
        dispatch(setDataEditorValidation(numberOfInvalidCells === 0));
    }, [dataArray]);

    const onGridReady = params => {
        gridApi = params.api;
        gridApi.sizeColumnsToFit();
    };

    const defaultColDef = {
        resizable: true,
        sortable: true,
        filter: true,
        editable: true,
        community,
        objectType,
    };

    const valueSetter = params => {
        const rowIndex = params.node.childIndex;
        const columnName = params.column.colId;
        const rowData = params.data;
        const value = params.newValue;
        dispatch(setAgGridDataArray(rowIndex, columnName, rowData, value));
        return false;
    };

    const cellClass = function(params) {
        if (!AgGridValidator(params)) {
            return 'invalid-cell';
        } else {
            return null;
        }
    };

    return (
        <div className="ag-theme-material" style={{ height: '600px' }}>
            <AgGridReact
                rowSelection="multiple"
                reactNext
                enableColResize
                columnDefs={colDefs}
                rowData={dataArray}
                defaultColDef={{ ...defaultColDef, valueSetter, cellClass }}
                onGridReady={rf => onGridReady(rf)}
            />
        </div>
    );
};

export default DataEditor;
