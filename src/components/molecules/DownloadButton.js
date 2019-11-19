import React, { useState } from 'react';
import DownloadIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import { ClapSpinner } from 'react-spinners-kit';

const DownloadButton = props => {
    const [isLoading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);

        //give the id and a callback to stop the loader on fetch
        props.onDownload(props.rowid, () => {
            setLoading(false);
        });
    };
    return (
        <Button color={'secondary'} onClick={handleClick}>
            {isLoading ? <ClapSpinner backColor={'#952806'} frontColor={'#123456'} size={20} /> : <DownloadIcon />}
        </Button>
    );
};
DownloadButton.propTypes = {
    rowid: PropTypes.string,
    onDownload: PropTypes.func,
};

export default DownloadButton;
