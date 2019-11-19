const getMappingState = store => store.mapping;

const getMappingProperties = store => (getMappingState(store) ? getMappingState(store).properties : []);

const getSelectedProperties = store => (getMappingState(store) ? getMappingState(store).selectedProperties : []);

const getAvailableProperties = store => getMappingProperties(store).filter(property => !getSelectedProperties(store).includes(property.value));

export { getMappingState, getMappingProperties, getSelectedProperties, getAvailableProperties };
