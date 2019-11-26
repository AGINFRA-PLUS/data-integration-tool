import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import RFFormHelper from './RFFormHelper';
import { useSelector } from 'react-redux';
import { getCommunity, getUploadObjects } from '../../redux/selectors/mainSelectors';
import InputLabel from '@material-ui/core/InputLabel';

const RFSelectBox = ({ input, label, meta: { touched, error }, items, ...custom }) => {
    const [currentItems, setCurrentItems] = useState(Array.isArray(items) ? items : []);
    const community = useSelector(getCommunity);
    const object = useSelector(getUploadObjects);
    useEffect(() => {
        if (typeof items === 'object' && items.url) {
            const url = items.url + (community === 'inra' ? object.charAt(0).toUpperCase() + object.slice(1) + 'Experiment' : '')

            fetch(process.env.REACT_APP_SERVER_ENDPOINT + '/getDatasets?url=' + url)
                .then(res => res.json())
                .then(json => (json.result.count > 0 ? setCurrentItems(json.result.results.map(res => ({ name: res.title, value: res.id, extra: res.name }))) : []));
        }
    }, []);
    return (
        <FormControl error={touched && error} style={{ width:'100%', marginTop:'10px' }}>
            <InputLabel id="select-label-id">{label}</InputLabel>
            <Select
                {...input}
                {...custom}
                labelId={'select-label-id'}
                inputProps={{
                    name: {label},
                    id: {label},
                }}>
                {currentItems.map((item, index) => (
                    <MenuItem key={index} value={typeof item === 'string' ? item : item.value}>
                        {typeof item === 'string' ? item : item.name}
                    </MenuItem>
                ))}
            </Select>
            {RFFormHelper({ touched, error })}
        </FormControl>
    );
}

export default RFSelectBox;
