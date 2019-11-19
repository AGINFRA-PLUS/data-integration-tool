const getFileManagementState = store => store.fileManagement;
const getUserItems = store => (getFileManagementState(store) ? getFileManagementState(store).items : null);
const getSelectedItem = store => (getFileManagementState(store) ? getFileManagementState(store).selectedItem : null);
export { getFileManagementState, getUserItems, getSelectedItem };
