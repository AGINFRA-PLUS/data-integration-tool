const AgGridValidator = params => {
    var isValid = true;
    var value = params.value + "";
    if (params.colDef.community === 'inra') {
        switch (params.colDef.headerName) {
            case 'objectAlias': {
                isValid = value && value !== '';
                break;
            }
            case 'objectType': {
                isValid = value === 'plant';
                break;
            }
            case 'Species': {
                isValid = value && value.toLowerCase() === params.colDef.objectType.toLowerCase();
                break;
            }
            case 'Variety': {
                isValid = value && value !== '';
                break;
            }
            case 'Geometry': {
                isValid = value && value !== '';
                break;
            }
            case 'Variable': {
                isValid = params.colDef.cellEditorParams.values.includes(value);
                break;
            }
            case 'Date': {
                // ex. 2000-02-29T12:00:12+03:00
                isValid = /(^[-]?((1[6789]|[2-9][0-9])[0-9]{2}-(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([Z]|\.[0-9]{4}|[-|\+]([0-1][0-9]|2[0-3]):([0-5][0-9]))?$|^[-]?((1[6789]|[2-9][0-9])[0-9]{2}-(0[469]|11)-(0[1-9]|[12][0-9]|30))T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([Z]|\.[0-9]{4}|[-|\+]([0-1][0-9]|2[0-3]):([0-5][0-9]))?$|^[-]?((16|[248][048]|[3579][26])00)|(1[6789]|[2-9][0-9])(0[48]|[13579][26]|[2468][048])-02-(0[1-9]|1[0-9]|2[0-9])T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([Z]|\.[0-9]{4}|[-|\+]([0-1][0-9]|2[0-3]):([0-5][0-9]))?$|^[-]?(1[6789]|[2-9][0-9])[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])([Z]|\.[0-9]{4}|[-|\+]([0-1][0-9]|2[0-3]):([0-5][0-9]))?$)/.test(value);
                break;
            }
            case 'Value': {
                isValid = /(^NA$)|(^-?(-?\d*((\,|\.)\d+)?)$)/.test(value);
                break;
            }
            default: {
                isValid = true;
            }
        }
    }

    return isValid;
};

export default AgGridValidator;
