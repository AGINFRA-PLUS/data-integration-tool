import { SET_VALIDATIONS, SET_VALIDATIONS_BY_STEP } from './actionTypes';

const setValidations = validations => ({
    type: SET_VALIDATIONS,
    payload: {
        validations,
    },
});

const setValidationsByStep = (validations, step) => ({
    type: SET_VALIDATIONS_BY_STEP,
    payload: {
        step,
        validations,
    },
});

export { setValidations, setValidationsByStep };
