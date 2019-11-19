import { ADD_SELECTED_PROPERTY, REMOVE_SELECTED_PROPERTY, SET_PROPERTIES, SET_SELECTED_PROPERTIES } from './actionTypes';

const setProperties = properties => ({
    type: SET_PROPERTIES,
    payload: {
        properties,
    },
});

const setSelectedProperties = selectedProperties => ({
    type: SET_SELECTED_PROPERTIES,
    payload: {
        selectedProperties,
    },
});

const addSelectedProperty = property => ({
    type: ADD_SELECTED_PROPERTY,
    payload: {
        property,
    },
});

const removeSelectedProperty = property => ({
    type: REMOVE_SELECTED_PROPERTY,
    payload: {
        property,
    },
});

export { setProperties, setSelectedProperties, addSelectedProperty, removeSelectedProperty };
