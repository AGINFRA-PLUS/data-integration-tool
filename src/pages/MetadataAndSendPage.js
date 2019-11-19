import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormAsyncErrors, getFormSyncErrors, getFormValues, submit } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import HeaderContentsFooterTemplate from '../components/templates/HeaderContentsFooterTemplate';
import MetaFormEditor from '../components/organisms/MetaFormEditor';
import { setMetadata } from '../redux/actions/mainActions';
import { METADATA_STEP_NAME } from '../EN_Texts';
import { getCommunity, getJsonForServer, getUploadMappings, getUploadMetadata } from '../redux/selectors/mainSelectors';
import ServerSendingDialog from '../components/molecules/ServerSendingDialog';
import { footstepValidation, getActiveStep, includesStep } from '../redux/selectors/stepsSelectors';
import { ROUTE_HOME } from '../ROUTES';
import composeCSVselectedCols from '../utils/composeCSVselectedCols';
import { getColumnDefs, getCurrentSheet, getDataArray, getFile } from '../redux/selectors/resourceSelectors';
import { setValidationsByStep } from '../redux/actions/validationActions';
import { formatDataForXLSX } from '../utils/AgGridDataFormatter';

const MetadataAndSendPage = () => {
    const dispatch = useDispatch();
    const form = useSelector(getFormValues(METADATA_STEP_NAME));
    const community = useSelector(getCommunity);
    const metadataStore = useSelector(getUploadMetadata);
    const currentSheet = useSelector(getCurrentSheet);
    const mappings = useSelector(getUploadMappings);
    const jsonForServer = useSelector(getJsonForServer);
    const currentStep = useSelector(getActiveStep);
    const file = useSelector(getFile);
    const hasEditorStep = useSelector(includesStep('editor'));
    const columnDefs = useSelector(getColumnDefs);
    const rowData = useSelector(getDataArray);

    const { enqueueSnackbar } = useSnackbar();

    const [fields, setFields] = useState([]);
    useEffect(() => {
        //GET METADATA FIELDS
        (async () => {
            let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/metadataFields?community=${community}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let json = await response.json();
            if (json.status === 'ok') {
                let validations = json.data.filter(field => field.required).map(field => field.name);
                setFields(json.data);
                dispatch(setValidationsByStep(validations, currentStep.name));
            } else {
                const { message } = json;
                enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
            }
        })();
    }, [community, currentStep.name, dispatch, enqueueSnackbar]);

    // VALIDATE AND SEND
    const formSyncErrors = useSelector(getFormSyncErrors(METADATA_STEP_NAME));
    const formAsyncErrors = useSelector(getFormAsyncErrors(METADATA_STEP_NAME));
    const isValid =
        (!formSyncErrors || (Object.keys(formSyncErrors).length === 0 && formSyncErrors.constructor === Object)) &&
        (!formAsyncErrors || (Object.keys(formAsyncErrors).length === 0 && formAsyncErrors.constructor === Object));
    const [sending, setSending] = useState(false);

    const handleFinish = cb => {
        dispatch(setMetadata(form));
        //since dispatch is slow and async for an unexpected reason, we'll add the metadata to the json to be sent manually
        const json1 = {
            ...jsonForServer,
            metadata: form,
        };

        //open the sending modal
        setSending(true);
        //sendToServer
        if (isValid) {
            (async () => {
                var formData = new FormData();
                //in case of file upload
                if (file) {
                    if (hasEditorStep) formData.append('csv', composeCSVselectedCols(formatDataForXLSX({ columnDefs, rowData })));
                    else formData.append('csv', composeCSVselectedCols(currentSheet, mappings));
                    formData.append('file', file);
                }
                //both in file and stream upload
                formData.append('json', JSON.stringify(json1));
                formData.append('apiKey', process.env.REACT_APP_API_KEY);

                let response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/sendCSV`, {
                    method: 'POST',
                    body: formData,
                });
                let json = await response.json();
                if (json.status === 'ok') {
                    //setTimeout just to show the loader
                    setTimeout(() => {
                        // run submit to run validations
                        dispatch(submit(METADATA_STEP_NAME));
                        // close the sending modal
                        setSending(false);
                        // run the callback given from finish button (go to next page etc.)
                        if (cb) cb();
                    }, 1000);
                } else {
                    // run submit to run validations
                    dispatch(submit(METADATA_STEP_NAME));
                    // close the sending modal
                    setSending(false);
                    // alert message
                    const { message } = json;
                    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 });
                }
            })();
        } else {
            // run submit to run validations
            dispatch(submit(METADATA_STEP_NAME));
            // close the sending modal
            setSending(false);
        }
    };

    const footstepsValid = useSelector(footstepValidation);
    if (footstepsValid)
        return (
            <HeaderContentsFooterTemplate onFinish={handleFinish}>
                <MetaFormEditor initialValues={metadataStore} fields={fields} onSubmit={() => {}} />
                <ServerSendingDialog open={sending} />
            </HeaderContentsFooterTemplate>
        );
    else return <Redirect to={ROUTE_HOME} />;
};

export default MetadataAndSendPage;
