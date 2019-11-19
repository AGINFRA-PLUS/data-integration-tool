import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box/Box';
import Grid from '@material-ui/core/Grid/Grid';
import Hidden from '@material-ui/core/Hidden/Hidden';

import NavigationSteps from '../molecules/NavigationSteps';
import { getStepByRoute, getStepsTexts } from '../../redux/selectors/stepsSelectors';
import { APP_TITLE, OF_TEXT, STEP_TEXT } from '../../EN_Texts';

const Stepper = ({ history }) => {
    const stepTexts = useSelector(getStepsTexts);
    const activeStep = useSelector(getStepByRoute(history.location.pathname)).index; //useSelector(getActiveIndex);
    return (
        <Grid container>
            <Hidden smDown>
                <Grid className={'hidden-xs'} item sm={1} float={'left'}>
                    <Box padding={'26px'}>{APP_TITLE}</Box>
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={10} lg={10}>
                <NavigationSteps activeStep={activeStep} steps={stepTexts} />
            </Grid>
            <Hidden smDown>
                <Grid item sm={1}>
                    <Box padding={'26px'} textAlign={'right'}>
                        {STEP_TEXT} {activeStep+1} {OF_TEXT} {stepTexts.length}
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    );
};

Stepper.propTypes = {
    history: PropTypes.object,
};
export default withRouter(Stepper);
