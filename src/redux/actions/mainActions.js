import {
    INIT_MAPPINGS,
    SET_COMMUNITY, SET_DATA_EDITOR_VALIDATION,
    SET_MAPPING,
    SET_METADATA, SET_THEME,
    SET_UPLOAD_OBJECTS,
    SET_UPLOAD_STREAM,
    SET_UPLOAD_TYPE,
} from './actionTypes';

const setCommunity = community => ({
    type: SET_COMMUNITY,
    payload: {
        community,
    },
});

const setTheme = theme => ({
    type: SET_THEME,
    payload: {
        theme,
    },
});

const setUploadType = type => ({
    type: SET_UPLOAD_TYPE,
    payload: {
        type,
    },
});

const setUploadObjects = objects => ({
    type: SET_UPLOAD_OBJECTS,
    payload: {
        objects,
    },
});

const setUploadStream = stream => ({
    type: SET_UPLOAD_STREAM,
    payload: {
        stream,
    },
});

const initMappings = mappings => ({
    type: INIT_MAPPINGS,
    payload: {
        mappings,
    },
});

const setMapping = mapping => ({
    type: SET_MAPPING,
    payload: {
        mapping,
    },
});

const setMetadata = metadata => ({
    type: SET_METADATA,
    payload: {
        metadata,
    },
});

const setDataEditorValidation = dataEditorValidation => ({
    type: SET_DATA_EDITOR_VALIDATION,
    payload: {
        dataEditorValidation,
    },
});

export { setCommunity, setTheme, setUploadType, setUploadObjects, setUploadStream, initMappings, setMapping, setMetadata, setDataEditorValidation };
