import {
    INIT_MAPPINGS, SET_COMMUNITY, SET_DATA_EDITOR_VALIDATION,
    SET_MAPPING,
    SET_METADATA, SET_THEME,
    SET_UPLOAD_OBJECTS,
    SET_UPLOAD_STREAM,
    SET_UPLOAD_TYPE,
} from '../actions/actionTypes';

const initialState = {
    community: null,
    theme: null,
    type: null,
    objects: null,
    file: null,
    stream: null,
    mappings: {},
    metadata: {},
    dataEditorValidation: true,
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMUNITY: {
            const { community } = action.payload;
            return {
                ...state,
                community,
            };
        }
        case SET_THEME: {
            const { theme } = action.payload;
            return {
                ...state,
                theme,
            };
        }
        case SET_UPLOAD_TYPE: {
            const { type } = action.payload;
            return {
                ...state,
                type,
            };
        }
        case SET_UPLOAD_OBJECTS: {
            const { objects } = action.payload;
            return {
                ...state,
                objects,
            };
        }
        case SET_UPLOAD_STREAM: {
            const { stream } = action.payload;
            return {
                ...state,
                stream,
            };
        }
        case INIT_MAPPINGS: {
            const { mappings } = action.payload;
            return {
                ...state,
                mappings,
            };
        }
        case SET_MAPPING: {
            const { mapping } = action.payload;
            const mappings = { ...state.mappings, ...mapping };
            return {
                ...state,
                mappings,
            };
        }
        case SET_METADATA: {
            const { metadata } = action.payload;
            return {
                ...state,
                metadata,
            };
        }
        case SET_DATA_EDITOR_VALIDATION: {
            const { dataEditorValidation } = action.payload;
            return {
                ...state,
                dataEditorValidation,
            };
        }
        default:
            return state;
    }
};

export default main;
