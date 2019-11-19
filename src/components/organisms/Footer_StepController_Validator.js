import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import { useDispatch, useSelector } from 'react-redux';

import NextButton from '../molecules/NextButton';
import BackButton from '../molecules/BackButton';
import FinishButton from '../molecules/FinishButton';
import CancelButton from '../molecules/CancelButton';
import { getStepByRoute, getStepsList } from '../../redux/selectors/stepsSelectors';
import { addFootstep, setActive } from '../../redux/actions/stepsActions';
import { getValidations } from '../../redux/selectors/validationSelectors';
import { getMainState } from '../../redux/selectors/mainSelectors';
import { getFilename } from '../../redux/selectors/resourceSelectors';
import { getSelectedProperties } from '../../redux/selectors/mappingSelectors';
import { ROUTE_HOME } from '../../ROUTES';

const Footer_StepController_Validator = ({ history, onBack, onNext, onFinish }) => {
    const dispatch = useDispatch();
    //for navigation
    const steps = useSelector(getStepsList);
    const current = useSelector(getStepByRoute(history.location.pathname));
    const back = current.index > 1 ? steps[current.index - 1] : null; // current.index > 1 to display back on the second and not the first page
    const next = current.index < steps.length - 1 ? steps[current.index + 1] : null;
    const finish = current.index === steps.length - 2; // steps.length - 2 to display finish on the pre-last page and not the last

    const goBack = () => {
        dispatch(addFootstep(current.index));
        dispatch(setActive(back.index));
        history.push(back.route);
        if (onBack) onBack();
    };
    const goNext = () => {
        dispatch(addFootstep(current.index));
        dispatch(setActive(next.index));
        history.push(next.route);
        if (onNext) onNext();
    };
    const doCancel = () => {
        window.location.href = ROUTE_HOME;
    };
    const doFinish = () => {
        if (onFinish) onFinish(goNext);
    };

    //for validation
    const validations = useSelector(getValidations);
    const main = useSelector(getMainState);
    const filename = useSelector(getFilename);
    const selectedMappings = useSelector(getSelectedProperties);

    const validator = () => {
        if (validations) {
            const validation = validations[current.name];
            if (validation) {
                switch (validation.state) {
                    case 'main': {
                        return main[validation.requiredFields] && !(Object.keys(main[validation.requiredFields]).length === 0 && main[validation.requiredFields].constructor === Object);
                    }
                    case 'resource': {
                        return filename && filename !== '';
                    }
                    case 'mapping': {
                        return validation.requiredFields.filter(field => !selectedMappings.includes(field)).length === 0;
                    }
                    default: {
                        return true;
                    }
                }
            }
        }
    };

    return (
        <Box display={'flex'} flex={'none'} padding={'16px 40px'} borderTop={'1px solid #cbd6e2'} backgroundColor={'#f5f8fa'}>
            <Box width={'100%'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
                    {back && <BackButton onClick={goBack} />}
                    <CancelButton onClick={doCancel} />
                </Box>
                {next && !finish && <NextButton disabled={!validator()} onClick={goNext} />}
                {finish && <FinishButton onClick={doFinish} />}
            </Box>
        </Box>
    );
};
Footer_StepController_Validator.propTypes = {
    history: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    onFinish: PropTypes.func,
};
export default withRouter(Footer_StepController_Validator);
