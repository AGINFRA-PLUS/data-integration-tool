import { ADD_FOOTSTEP, SET_ACTIVE_STEP, SET_CURRENT_STEPS, SET_FILE_STEPS, SET_FOOTSTEPS, SET_STREAM_STEPS } from '../actions/actionTypes';

const initialState = {
    currentSteps: [],
    activeStep: 0,
    footsteps: [],
    fileSteps: [],
    streamSteps: [],
};

const steps = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILE_STEPS: {
            const { steps } = action.payload;
            return {
                ...state,
                fileSteps: [...steps],
            };
        }
        case SET_STREAM_STEPS: {
            const { steps } = action.payload;
            return {
                ...state,
                streamSteps: [...steps],
            };
        }
        case SET_CURRENT_STEPS: {
            const { steps } = action.payload;
            return {
                ...state,
                currentSteps: [...steps],
            };
        }
        case SET_ACTIVE_STEP: {
            const { step } = action.payload;
            return {
                ...state,
                activeStep: step,
            };
        }
        case SET_FOOTSTEPS: {
            const { footsteps } = action.payload;
            return {
                ...state,
                footsteps,
            };
        }
        case ADD_FOOTSTEP: {
            const { footstep } = action.payload;
            const footsteps = [...state.footsteps, footstep];
            return {
                ...state,
                footsteps,
            };
        }
        default:
            return state;
    }
};

export default steps;
