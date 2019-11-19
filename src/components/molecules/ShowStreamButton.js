import React, { useState } from 'react';
import ShowIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import { ClapSpinner } from 'react-spinners-kit';

const ShowStreamButton = props => {
    const [isLoading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);

        //give the id and a callback to stop the loader on fetch
        props.onShowStream(props.rowid, () => {
            setLoading(false);
        });
    };
    return (
        <Button color={'secondary'} onClick={handleClick}>
            {isLoading ? <ClapSpinner backColor={'#952806'} frontColor={'#123456'} size={20} /> : <ShowIcon />}
        </Button>
    );
};
ShowStreamButton.propTypes = {
    rowid: PropTypes.string,
    onShowStream: PropTypes.func,
};

export default ShowStreamButton;
