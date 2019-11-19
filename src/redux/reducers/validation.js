import { SET_VALIDATIONS, SET_VALIDATIONS_BY_STEP } from '../actions/actionTypes';

const initialState = {
    validations: {},
};

const validation = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALIDATIONS: {
            const { validations } = action.payload;
            return {
                ...state,
                validations,
            };
        }
        case SET_VALIDATIONS_BY_STEP: {
            const { validations, step } = action.payload;
            return {
                ...state,
                validations: {
                    ...state.validations,
                    [step]: {
                        ...state.validations[step],
                        requiredFields: validations,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default validation;
