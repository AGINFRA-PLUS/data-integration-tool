import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import { useDispatch, useSelector } from 'react-redux';

import { getUploadStream } from '../../redux/selectors/mainSelectors';
import { setUploadStream } from '../../redux/actions/mainActions';

const StreamSetter = () => {
    const dispatch = useDispatch();
    const stream = useSelector(getUploadStream);
    const handleChange = event => {
        dispatch(setUploadStream(event.target.value));
    };
    return (
        <TextField
            id="stream-setter"
            label="Stream URL"
            style={{ margin: 8 }}
            placeholder="Please enter your URL here"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            value={stream}
            onChange={handleChange}
        />
    );
};

export default StreamSetter;
