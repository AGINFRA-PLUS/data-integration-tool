/* WARNING!!!
    ANY CHANGES MADE TO THIS FILE, MUST ALSO BE MADE ON THE FILE USED WITHOUT WEB WORKERS
 */

function XlsxReadForWorker() {
    /* the worker cannot access node_modules neither use import since it will run in a different thread than the main app,
     * so we are using importScripts to import the XLSX library from a remote path
     * we also disable eslint for the next line since importScripts is not loaded in the project, but is used inside worker */
    // eslint-disable-next-line no-undef
    importScripts(process.env.REACT_APP_REMOTE_XLSX_LIBRARY);

    // since the worker has not been initialized yet, the onmessage listener does not exist, so we add a new listener
    this.addEventListener('message', event => {
        if (!event) return;
        // get the file sent from UI thread
        const file = event.data;
        const reader = new FileReader();
        // read as binary or as array
        const rABS = !!reader.readAsBinaryString;
        // the listener
        reader.onload = e => {
            //file
            const excelfile = e.target.result;

            //resource: XLSX will be loaded remotely that's why we need to suppress eslint for the next line
            // eslint-disable-next-line no-undef
            const wb = XLSX.read(excelfile, { type: rABS ? 'binary' : 'array', cellText: true, cellDates: true });

            //sheetArray: XLSX will be loaded remotely that's why we need to suppress eslint for the next line
            // eslint-disable-next-line no-undef
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
            postMessage(JSON.stringify({ wb, sheetArray, initialMappings }));
        };

        //run the reader
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    });
}
export default XlsxReadForWorker;
