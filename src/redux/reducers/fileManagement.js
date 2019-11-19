import { DELETE_USER_ITEM, SET_SELECTED_USER_ITEM, SET_USER_ITEMS } from '../actions/actionTypes';

const initialState = {
    items: null,
    selectedItem: null,
    deleteDialogVisible: false,
};

const fileManagement = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ITEMS: {
            const { items } = action.payload;
            return {
                ...state,
                items,
            };
        }
        case SET_SELECTED_USER_ITEM: {
            const { item } = action.payload;
            return {
                ...state,
                selectedItem: item,
            };
        }
        case DELETE_USER_ITEM: {
            const { id } = action.payload;
            const items = state.items.filter(si => si.id !== id);
            return {
                ...state,
                items,
            };
        }
        default:
            return state;
    }
};

export default fileManagement;
