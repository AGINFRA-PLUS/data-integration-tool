const composeMappedDatatable = (array, mappings) => {
    // get selected columns
    const selectedCols = Object.keys(mappings).filter(header => mappings[header]);
    // get indexes of selected columns
    const selectedIndexes = selectedCols.map(colName => array[0].indexOf(colName));
    // filter array to contain only selected columns
    let finalArray = array.map(row => row.filter((field, index) => selectedIndexes.includes(index)));
    // change headers from original to selected properties
    finalArray[0] = selectedCols.map(col => mappings[col]);
    // convert to CSV
    return finalArray;
};

export default composeMappedDatatable;
