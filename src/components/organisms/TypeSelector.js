import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMainState } from '../../redux/selectors/mainSelectors';
import { setUploadType } from '../../redux/actions/mainActions';
import SelectableGroup from '../molecules/SelectableGroup';
import { getActiveStep, getStepsByType } from '../../redux/selectors/stepsSelectors';
import { setSteps } from '../../redux/actions/stepsActions';

const TypeSelector = () => {
    const step = useSelector(getActiveStep);
    const selected = useSelector(getMainState)[step.name];
    const dispatch = useDispatch();

    const fileSteps = useSelector(getStepsByType('file'));
    const streamSteps = useSelector(getStepsByType('stream'));
    const edit = value => {
        dispatch(setUploadType(value));
        dispatch(setSteps(value === 'file' ? fileSteps : streamSteps));
    };

    return (
        <div>
            <SelectableGroup selectables={step.selectables} selected={selected} onChange={edit} />
        </div>
    );
};
export default TypeSelector;
