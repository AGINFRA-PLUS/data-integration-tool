import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { AnimatedSwitch } from 'react-router-transition';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import SelectTypePage from './pages/SelectTypePage';
import HomePage from './pages/HomePage';
import SelectObjectsPage from './pages/SelectObjectsPage';
import { ROUTE_FINISHED, ROUTE_HOME, ROUTE_LOGIN, ROUTE_MAPPING, ROUTE_METADATA, ROUTE_SELECT_OJECTS, ROUTE_SELECT_TYPE, ROUTE_UPLOAD_FILE, ROUTE_UPLOAD_STREAM } from './ROUTES';
import UploadFilePage from './pages/UploadFilePage';
import MetadataAndSendPage from './pages/MetadataAndSendPage';
import MappingPage from './pages/MappingPage';
import FinishedPage from './pages/FinishedPage';
import theme from './styles/theme';
import UploadStreamPage from './pages/UploadStreamPage';
import { bounceTransition, mapStyles } from './styles/pageAnimationConfig';
import { getTheme } from './redux/selectors/mainSelectors';
import LoginPage from './pages/LoginPage';
import DataEditPage from './pages/DataEditPage';

require('dotenv').config();
// page animations wraper
const Animation = styled(AnimatedSwitch)`
    position: relative;
    height: 100%;
    & > div {
        position: absolute;
        height: 100%;
        width: 100%;
    }
`;

const App = () => {
    const personalizedTheme = useSelector(getTheme);
    return (
        <ThemeProvider theme={personalizedTheme ? theme(personalizedTheme) : null}>
            <SnackbarProvider maxSnack={2}>
                {/* TO DO: USE Material UI CssBaseline here instead of body css in index html */}
                <Router>
                    <Animation atEnter={bounceTransition.atEnter} atLeave={bounceTransition.atLeave} atActive={bounceTransition.atActive} mapStyles={mapStyles} className="route-wrapper">
                        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
                        <Route exact path={ROUTE_HOME} component={HomePage} />
                        <Route exact path={ROUTE_SELECT_TYPE} component={SelectTypePage} />
                        <Route exact path={ROUTE_SELECT_OJECTS} component={SelectObjectsPage} />
                        <Route exact path={ROUTE_UPLOAD_FILE} component={UploadFilePage} />
                        <Route exact path={ROUTE_UPLOAD_STREAM} component={UploadStreamPage} />
                        <Route exact path={ROUTE_MAPPING} component={MappingPage} />
                        <Route exact path={'/editor'} component={DataEditPage} />
                        <Route exact path={ROUTE_METADATA} component={MetadataAndSendPage} />
                        <Route exact path={ROUTE_FINISHED} component={FinishedPage} />
                    </Animation>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
