const getStepsState = store => store.steps;

const getStepsByType = type => store => (getStepsState(store) && getStepsState(store)[`${type}Steps`] ? getStepsState(store)[`${type}Steps`] : []);

const getStepsList = store => (getStepsState(store) ? getStepsState(store).currentSteps : []);

const getStepByRoute = route => store => getStepsList(store).find(step => step.route === route);

const getStepsNames = store => getStepsList(store).map(step => step.name);

const getStepsTexts = store => getStepsList(store).map(step => step.text);

const getStepName = (store, step) => getStepsNames(store)[step];

const getActiveIndex = store => getStepsState(store).activeStep;

const getActiveStep = store => getStepsList(store)[getActiveIndex(store)];

const getFootsteps = store => (getStepsState(store) ? getStepsState(store).footsteps : []);

const includesStep = stepName => store => getStepsList(store).find(step => step.name === stepName);

//checks if it came to this page directly from the url
const footstepValidation = store => {
    // passes the step param and not the (getActiveIndex) since the first time needs to be used by the url
    const step = getActiveIndex(store);
    let isValid = true;
    const footsteps = getFootsteps(store);
    if (footsteps.length > 0) {
        for (let i = -1; i < step; i++) {
            if (!footsteps.includes(i)) isValid = false;
        }
    } else {
        isValid = false;
    }
    return isValid;
};

export { getStepsState, getStepsByType, getStepsList, getStepName, getActiveIndex, getActiveStep, getStepsTexts, getStepsNames, getStepByRoute, getFootsteps, footstepValidation, includesStep };
