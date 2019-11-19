import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMainState } from '../../redux/selectors/mainSelectors';
import { setUploadObjects } from '../../redux/actions/mainActions';
import SelectableGroup from '../molecules/SelectableGroup';
import { getActiveStep } from '../../redux/selectors/stepsSelectors';;

const ObjectsSelector = () => {
    const step = useSelector(getActiveStep);
    const selected = useSelector(getMainState)[step.name];
    const dispatch = useDispatch();
    const edit = value => {
        dispatch(setUploadObjects(value));
    };

    return (
        <div>
            <SelectableGroup selectables={step.selectables} selected={selected} onChange={edit} />
        </div>
    );
};
export default ObjectsSelector;
