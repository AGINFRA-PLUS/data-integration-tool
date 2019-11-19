import Autosuggest from 'react-autosuggest';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TooltipedSelectItem from '../atoms/TooltipedSelectItem';
import '../../styles/react-autosuggest.css';

const getSuggestionValue = suggestion => suggestion.name.english;
const renderSuggestion = suggestion => <TooltipedSelectItem overlay={suggestion.id} itemValue={getSuggestionValue(suggestion)} />;

const AutosuggestRemote = props => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event, { newValue }) => {
        setValue(newValue);
        if (props.onChange) props.onChange(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        fetch(props.url + value + '&' + (props.addParameter ? props.addParameter : ''))
            .then(response => response.json())
            .then(data => {
                var res = props.responseObj ? data[props.responseObj] : data;
                var arr = props.resultsObj ? res[props.resultsObj] : res;
                var filtered = props.filter && props.filter.type === 'startsWith' ? arr.filter(item => item[props.filter.property].startsWith(props.filter.value)) : arr;
                setSuggestions(filtered);
            });
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: props.placeholder,
        value,
        onChange: onChange,
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
};

AutosuggestRemote.propTypes = {
    placeholder: PropTypes.string,
    url: PropTypes.string,
    addParameter: PropTypes.string,
    responseObj: PropTypes.string,
    resultsObj: PropTypes.string,
    filter: PropTypes.object,
    onChange: PropTypes.func,
}

export default AutosuggestRemote;
