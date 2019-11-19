let i = 0;
const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log(i++, 'next state', store.getState());
    console.groupEnd();
    return result;
};

export default logger;
