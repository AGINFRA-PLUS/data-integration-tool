import { INIT_AGGRID, SET_AGGRID_COLDEFS, SET_AGGRID_DATA_ARRAY, SET_CURRENT_SHEET, SET_FILE, SET_RESOURCE } from './actionTypes';

const setFile = file => ({
    type: SET_FILE,
    payload: {
        file,
    },
});
const setResource = (resource, sheetArray) => ({
    type: SET_RESOURCE,
    payload: {
        resource,
        sheetArray,
    },
});
const setCurrentSheet = sheet => ({
    type: SET_CURRENT_SHEET,
    payload: {
        sheet,
    },
});
const initAgGrid = (mappings, properties) => ({
    type: INIT_AGGRID,
    payload: {
        mappings,
        properties,
    },
});
const setAgGridColumnDefs = agGridcolumnDefs => ({
    type: SET_AGGRID_COLDEFS,
    payload: {
        agGridcolumnDefs,
    },
});
const setAgGridDataArray = (rowIndex, columnName, rowData, value) => ({
    type: SET_AGGRID_DATA_ARRAY,
    payload: {
        rowIndex,
        columnName,
        rowData,
        value,
    },
});

export { setFile, setResource, setCurrentSheet, initAgGrid, setAgGridColumnDefs, setAgGridDataArray };
