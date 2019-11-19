import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download';
import { useSnackbar } from 'notistack';
import Hidden from '@material-ui/core/Hidden';
import { Redirect } from 'react-router-dom';

import FancyButton from '../components/atoms/FancyButton';
import LogoContentsTemplate from '../components/templates/LogoContentsTemplate';
import { addFootstep, setFileSteps, setSteps, setStreamSteps } from '../redux/actions/stepsActions';
import { setValidations } from '../redux/actions/validationActions';
import FileManager from '../components/organisms/FileManager';
import Loader from '../components/molecules/Loader';
import { getUserItems } from '../redux/selectors/fileManagementSelectors';
import { deleteUserItem, setUserItems } from '../redux/actions/fileManagementActions';
import { setTheme } from '../redux/actions/mainActions';
import { getCommunity } from '../redux/selectors/mainSelectors';
import { ROUTE_LOGIN } from '../ROUTES';
import { getStepsList } from '../redux/selectors/stepsSelectors';

const HomePage = ({ history }) => {
    const dispatch = useDispatch();
    const steps = useSelector(getStepsList);
    const items = useSelector(getUserItems);
    const community = useSelector(getCommunity);
    const [userDataLoading, setUserDataLoading] = useState(false);
    const [serverResponded, setServerResponded] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [logo, setLogo] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (community) {
            //GET THEME
            (async () => {
                const response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/theme?community=${community}`);
                const jsonResponse = await response.json();
                if (jsonResponse.status === 'ok') {
                    dispatch(setTheme(jsonResponse.data));
                    setServerResponded(true);
                }
            })();
            //GET FIRST SCREEN DATA
            (async () => {
                let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/entranceScreen?community=${community}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                let json = await response.json();
                if (json.status === 'ok') {
                    setLogo(json.data.logo);
                    setTitle(json.data.title);
                    setText(json.data.text);
                } else {
                    const { message } = json;
                    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
                }
            })();

            //GET VALIDATORS
            (async () => {
                let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/validations?community=${community}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                let json = await response.json();
                if (json.status === 'ok') {
                    dispatch(setValidations(json.data.validations));
                } else {
                    const { message } = json;
                    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
                }
            })();

            //GET STEPS
            (async () => {
                let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/steps?community=${community}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                let json = await response.json();
                if (json.status === 'ok') {
                    dispatch(setSteps(json.data.fileSteps));
                    dispatch(setFileSteps(json.data.fileSteps));
                    dispatch(setStreamSteps(json.data.streamSteps));
                } else {
                    const { message } = json;
                    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
                }
            })();
            // GET USER DATA
            (async () => {
                setUserDataLoading(true);
                let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/uploadedData?community=${community}&apiKey=${process.env.REACT_APP_API_KEY}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                let json = await response.json();
                if (json.status === 'ok') {
                    dispatch(setUserItems(json.data));
                    setUserDataLoading(false);
                } else {
                    const { message } = json;
                    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
                }
            })();
        }
    }, [community, dispatch, enqueueSnackbar]);

    // GET DETAILED ITEM
    const getItemFromServer = async id => {
        let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/uploadedData?id=${id}&community=${community}&apiKey=${process.env.REACT_APP_API_KEY}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    const handleStreamShow = async (id, callback) => {
        const json = await getItemFromServer(id);
        if (json.status === 'ok') {
            if (json.data.length > 0) {
                const { information } = json.data[0];
                const { url } = information;
                alert(`The stream url is: ${url}`);
                if (callback) callback(); //eg. stop loader
            } else {
                const message = 'There was a problem trying to get stream data (Client)';
                enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
            }
        } else {
            const { message } = json;
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
        }
    };

    const handleDatasetDownload = async (id, callback) => {
        const json = await getItemFromServer(id);
        if (json.status === 'ok') {
            if (json.data.length > 0) {
                const { information } = json.data[0];
                const { csv, originalname } = information;
                const filename = originalname.substring(0, originalname.length - 4) + '.csv';
                var csvBlob = new Blob([csv], { type: 'text/csv' });
                fileDownload(csvBlob, filename);
                if (callback) callback(); //eg. stop loader
            } else {
                const message = 'There was a problem trying to download data (Client)';
                enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
            }
        } else {
            const { message } = json;
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
        }
    };

    const handleDelete = async id => {
        let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/removeItem?id=${id}&community=${community}&apiKey=${process.env.REACT_APP_API_KEY}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let json = await response.json();
        if (json.status === 'ok') {
            dispatch(deleteUserItem(id));
        } else {
            const { message } = json;
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
        }
    };
    if (community) {
        return serverResponded ? (
            <LogoContentsTemplate logo={logo}>
                <Box marginTop={'10vh'} />
                <Hidden xsDown>
                    <Typography align={'center'} variant="h1" component="h2">
                        {title}
                    </Typography>
                </Hidden>
                <Hidden smUp>
                    <Typography align={'center'} variant="h2" component="h3">
                        {title}
                    </Typography>
                </Hidden>
                <Box marginTop={'8vh'} />
                <Typography align={'justify'}>{text}</Typography>
                <Box marginTop={'8vh'} />
                <div>
                    <center>
                        <FancyButton
                            onClick={() => {
                                dispatch(addFootstep(-1));
                                history.push(steps[0].route);
                            }}>
                            <span>Add New</span>
                        </FancyButton>
                    </center>
                    <Box marginTop={'8vh'} />
                    {userDataLoading ? <Loader /> : <FileManager items={items} handleStreamShow={handleStreamShow} handleDatasetDownload={handleDatasetDownload} handleDelete={handleDelete} />}
                    <Box marginTop={'6vh'} />
                </div>
            </LogoContentsTemplate>
        ) : (
            <center>Waiting for server response</center>
        );
    } else {
        return <Redirect to={ROUTE_LOGIN} />;
    }
};

HomePage.propTypes = {
    history: PropTypes.object,
};
export default HomePage;
