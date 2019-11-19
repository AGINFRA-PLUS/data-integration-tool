import { ADD_SELECTED_PROPERTY, REMOVE_SELECTED_PROPERTY, SET_PROPERTIES, SET_SELECTED_PROPERTIES } from '../actions/actionTypes';

const initialState = {
    properties: [],
    selectedProperties: [],
};

const mapping = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTIES: {
            const { properties } = action.payload;
            return {
                ...state,
                properties: [...properties],
            };
        }
        case SET_SELECTED_PROPERTIES: {
            const { selectedProperties } = action.payload;
            return {
                ...state,
                selectedProperties: [...selectedProperties],
            };
        }
        case ADD_SELECTED_PROPERTY: {
            const { property } = action.payload;
            return {
                ...state,
                selectedProperties: [...state.selectedProperties, property],
            };
        }
        case REMOVE_SELECTED_PROPERTY: {
            const { property } = action.payload;
            return {
                ...state,
                selectedProperties: state.selectedProperties.filter(selected => selected !== property),
            };
        }
        default:
            return state;
    }
};

export default mapping;
