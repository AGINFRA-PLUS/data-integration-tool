const getValidationState = store => store.validation;
const getValidations = store => (getValidationState(store) ? getValidationState(store).validations : null);

export { getValidationState, getValidations };
