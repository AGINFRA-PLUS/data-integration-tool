import React, { useState } from 'react';
import Box from '@material-ui/core/Box/Box';
import { useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import xlsxRead from '../../utils/xlsxRead';
import DragDropFile from '../molecules/DragDropFile';
import DataInput from '../molecules/DataInput';
import { DRAG_DROP, SELECT_FILE } from '../../EN_Texts';
import { initMappings } from '../../redux/actions/mainActions';
import { setCurrentSheet, setFile, setResource } from '../../redux/actions/resourceActions';
import { getFile } from '../../redux/selectors/resourceSelectors';
import WebWorker from '../../utils/WebWorker';
import xlsxReadWorker from '../../utils/xlsxReadForWorker';
import Loader from '../molecules/Loader';
import { setSelectedProperties } from '../../redux/actions/mappingActions';

const Uploader = () => {
    const dispatch = useDispatch();
    const file = useSelector(getFile);
    const [isLoading, setLoading] = useState(false);

    const handleFile = async file => {
        setLoading(true);
        // check if browser supports workers
        const useworker = typeof Worker !== 'undefined';
        // with worker support
        if (useworker) {
            // a seperate worker thread for not stopping the UI in case of big files loading
            let webWorker = new WebWorker(xlsxReadWorker);
            // send the file to the worker
            webWorker.postMessage(file);
            // the listener for the response of the worker when done
            webWorker.addEventListener('message', event => {
                //get the read data
                const { wb, sheetArray, initialMappings } = JSON.parse(event.data);
                //set the store
                doOnceFileLoaded(file, wb, sheetArray, initialMappings);
            });
            // if no worker support
        } else {
            const { wb, sheetArray, initialMappings } = await xlsxRead(file);
            doOnceFileLoaded(file, wb, sheetArray, initialMappings);
        }
    };

    const doOnceFileLoaded = (file, wb, sheetArray, initialMappings) => {
        dispatch(setFile(file));
        dispatch(setResource(wb, sheetArray));
        dispatch(setCurrentSheet(0));
        dispatch(initMappings(initialMappings));
        dispatch(setSelectedProperties([]));
        setLoading(false);
    };

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const successColor = theme.palette.success.dark;
    return (
        <Box borderRadius={'10px'} bgcolor={successColor}>
            {file && (
                <Box padding={'10px'} fontSize={'14px'} color={'white'} textAlign={'center'}>
                    The file <b>{file.name}</b> has been uploaded. If you want to use another file, you can still use the area bellow, otherwise, you can click next
                </Box>
            )}
            <DragDropFile handleFile={handleFile} text={DRAG_DROP}>
                {isLoading ? (
                    <Loader />
                ) : (
                    <Box textAlign={'center'} fontSize={'1.3em'}>
                        Drag n Drop or <DataInput handleFile={handleFile} text={file ? '' : SELECT_FILE} mainColor={'white'} backgroundColor={primaryColor} /> to upload to the Data Platform.
                        <br />
                        All .csv, .xlsx, and .xls file types are supported.
                    </Box>
                )}
            </DragDropFile>
        </Box>
    );
};

export default Uploader;
