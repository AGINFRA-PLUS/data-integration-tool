import {
    INIT_AGGRID,
    SET_AGGRID_COLDEFS,
    SET_AGGRID_DATA_ARRAY,
    SET_CURRENT_SHEET,
    SET_FILE,
    SET_RESOURCE,
} from '../actions/actionTypes';
import { formatDataForReactAggrid } from '../../utils/AgGridDataFormatter';
import composeMappedDatatable from '../../utils/composeMappedDatatable';

const initialState = {
    file: null,
    name: '',
    SheetNames: [],
    Sheets: {},
    currentSheet: null,
    sheetArray: [],
    agGridcolumnDefs: null,
    agGridDataArray: null,
};

const resource = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILE: {
            const { file } = action.payload;
            return {
                ...state,
                file,
            };
        }
        case SET_RESOURCE: {
            const { resource, sheetArray } = action.payload;
            return {
                ...state,
                ...resource,
                sheetArray,
            };
        }
        case SET_CURRENT_SHEET: {
            const { sheet } = action.payload;
            return {
                ...state,
                currentSheet: sheet,
            };
        }
        case INIT_AGGRID: {
            const { mappings, properties } = action.payload;
            const agGrid = formatDataForReactAggrid(composeMappedDatatable(state.sheetArray[state.currentSheet], mappings), { properties });
            return {
                ...state,
                agGridcolumnDefs: agGrid.columnDefs,
                agGridDataArray: agGrid.rowData,
            };
        }
        case SET_AGGRID_COLDEFS: {
            const { agGridcolumnDefs } = action.payload;
            return {
                ...state,
                agGridcolumnDefs,
            };
        }
        case SET_AGGRID_DATA_ARRAY: {
            const { rowIndex, columnName, rowData, value } = action.payload;
            return {
                ...state,
                agGridDataArray: [
                    ...state.agGridDataArray.filter((item, index) => index < rowIndex),
                    { ...rowData, [columnName]: value },
                    ...state.agGridDataArray.filter((item, index) => index > rowIndex),
                ],
            };
        }
        default:
            return state;
    }
};

export default resource;
