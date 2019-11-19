import { DELETE_USER_ITEM, SET_SELECTED_USER_ITEM, SET_USER_ITEMS } from './actionTypes';

const setUserItems = items => ({
    type: SET_USER_ITEMS,
    payload: {
        items,
    },
});

const deleteUserItem = id => ({
    type: DELETE_USER_ITEM,
    payload: {
        id,
    },
});

const setSelectedItem = item => ({
    type: SET_SELECTED_USER_ITEM,
    payload: {
        item,
    },
});

export { setUserItems, setSelectedItem, deleteUserItem };
