import { SET_CURRENT_STEPS, SET_ACTIVE_STEP, SET_FILE_STEPS, SET_STREAM_STEPS, SET_FOOTSTEPS, ADD_FOOTSTEP } from './actionTypes';

const setFileSteps = steps => ({
    type: SET_FILE_STEPS,
    payload: {
        steps,
    },
});

const setStreamSteps = steps => ({
    type: SET_STREAM_STEPS,
    payload: {
        steps,
    },
});

const setSteps = steps => ({
    type: SET_CURRENT_STEPS,
    payload: {
        steps,
    },
});

const setActive = step => ({
    type: SET_ACTIVE_STEP,
    payload: {
        step,
    },
});

const setFootsteps = footsteps => ({
    type: SET_FOOTSTEPS,
    payload: {
        footsteps,
    },
});

const addFootstep = footstep => ({
    type: ADD_FOOTSTEP,
    payload: {
        footstep,
    },
});

export { setFileSteps, setStreamSteps, setSteps, setActive, setFootsteps, addFootstep };
