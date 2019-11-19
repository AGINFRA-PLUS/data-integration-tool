export const createColumnDefs = (data, properties) => {
    const headers = data && data.length > 0 ? data[0] : [];
    return headers.map(header => {

        //add extra attributes for controlled anotate item
        let extra = {};
        const annotateItem = properties.find(prop => prop.annotate && prop.label === header);
        if (annotateItem) {
            extra = {
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: annotateItem.annotate.list,
                },
            };
        }

        return {
            headerName: header,
            field: header,
            ...extra,
        };
    });
};

export const formatDataForReactAggrid = (data, { properties }) => {
    const output = {
        columnDefs: [],
        rowData: [],
    };
    let curRow = [];
    let rows = [];
    let columns = createColumnDefs(data, properties);

    if (columns.length > 0) {
        for (var i = 1; i < data.length; i++) {
            curRow = {};
            var count = 0;
            data[i].forEach(item => {
                curRow[columns[count].field] = item;
                count++;
            });
            if (curRow != {}) {
                rows.push(curRow);
            }
        }
    } else {
        alert("The specific sheet does not provide column names in the first row. Therefore, it can't be proccessed");
    }
    output.columnDefs = columns;
    output.rowData = rows;
    return output;
};

export const formatDataForXLSX = input => {
    let curRow = [];
    let output = [];
    let columnDefs = input.columnDefs;
    let rowData = input.rowData;
    columnDefs.forEach(column => {
        curRow.push(column.headerName);
    });
    output.push(curRow);
    rowData.forEach(row => {
        curRow = [];
        for (var col in row) {
            curRow.push(row[col]);
        }
        output.push(curRow);
    });
    return output;
};
