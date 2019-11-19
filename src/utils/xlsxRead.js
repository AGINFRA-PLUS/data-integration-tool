import XLSX from 'xlsx';

/* WARNING!!!
    ANY CHANGES MADE TO THIS FILE, MUST ALSO BE MADE ON THE FILE USED WITH WEB WORKERS
 */

const xlsxRead = (file)=>{
    let promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        // read as binary or as array
        const rABS = !!reader.readAsBinaryString;
        // the listener
        reader.onload = e => {
            //file
            const excelfile = e.target.result;

            //resource
            const wb = XLSX.read(excelfile, { type: rABS ? 'binary' : 'array', cellText: true, cellDates: false });

            //sheetArray
            const sheetArray = wb.SheetNames ? wb.SheetNames.map(name => XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 })) : [];

            //allHeadersCombined
            let headers = [];
            sheetArray.forEach(sheet => {
                headers = [...headers, ...sheet[0]];
            });

            //initialMappings
            const initialMappings = {};
            headers.forEach(header => {
                initialMappings[header] = null;
            });

            //add filename to the resource
            wb.name = file.name;

            //send result back to UI thread
            resolve({ wb, sheetArray, initialMappings });
        };

        //run the reader
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    });
    return promise;
};

export default xlsxRead;
