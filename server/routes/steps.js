var router = require('express').Router();

//get steps
router.get('/', async (req, res) => {
    //get objects
    const { community } = req.query;
    const url = `http://52.214.72.17:8080/mock/${community}/options.json`;
    const result = await fetch(url);
    if (result.ok) {
        const resultJson = await result.json();
        res.send({
            status: 'ok',
            data: {
                fileSteps: [
                    {
                        index: 0,
                        name: 'type',
                        text: 'Data Source Selection',
                        title: 'What would you like to upload?',
                        subtitle: 'Choose the source of data to be uploaded (file or API endpoint – currently only files are supported)',
                        infobox: null,
                        selectables: [
                            {
                                name: 'File from computer',
                                value: 'file',
                                text: 'Upload any CSV, XLS, or XLSX files with entity information.',
                                image: 'http://52.17.48.226:5151/static/static_files/document.png',
                            },
                            {
                                name: 'Stream from an endpoint',
                                value: 'stream',
                                text: 'Import a URL pointing to a data stream (IOT sensors, data APIs etc.)',
                                image: 'http://52.17.48.226:5151/static/static_files/url.png',
                            },
                        ],
                        route: '/type',
                    },
                    {
                        index: 1,
                        name: 'objects',
                        text: 'Data Type Selection',
                        title: 'What type of data do you like to upload?',
                        subtitle: 'Choose the type of data to be uploaded (based on the data types obtained from the Agroknow Data Integration API)',
                        infobox: null,
                        selectables: resultJson.options.map(option => ({
                            name: option.name,
                            value: option.name,
                            text: option.description,
                            image: option.image,
                        })),
                        route: '/objects',
                    },
                    {
                        index: 2,
                        name: 'file',
                        text: 'Data Upload',
                        title: 'Upload the file',
                        subtitle: 'Formats currently supported: CSV, XLS, XLSX',
                        infobox: 'If the file contains tabular data, the first row must have unique headers to distinguish the different columns.',
                        route: '/file',
                    },
                    {
                        index: 3,
                        name: 'mapping',
                        text: 'Data Mapping',
                        title: 'Map your Data to the schema elements',
                        subtitle: 'Map your file columns to the expected schema elements, according to the Data Integration API specification',
                        infobox: null,
                        route: '/mapping',
                    },
                    {
                        index: 4,
                        name: 'editor',
                        text: 'Data Editor',
                        title: 'Edit your Data',
                        subtitle: 'Fill-in the missing or erroneous values in the online Microsoft Excel-like interface',
                        infobox: null,
                        route: '/editor',
                    },
                    {
                        index: 5,
                        name: 'metadata',
                        text: 'Metadata',
                        title: 'Add some final useful information',
                        subtitle: 'Fill in some metadata that accompany the file that you want to publish and select the data asset that you want to associate the file with',
                        infobox: null,
                        route: '/metadata',
                    },
                    {
                        index: 6,
                        name: 'finished',
                        text: 'Publish',
                        title: 'The file has been published on the target repository',
                        subtitle: 'Thank you for using the Data Integration Tool!',
                        infobox: null,
                        route: '/finished',
                    },
                ],
                streamSteps: [
                    {
                        index: 0,
                        name: 'type',
                        text: 'Select Type of Data',
                        title: 'What would you like to import?',
                        subtitle: 'Starting, please choose the type of data you want to upload. Is it a data file or a stream like a sensor API?',
                        infobox: 'Need help getting started? View import guide',
                        selectables: [
                            {
                                name: 'File from computer',
                                value: 'file',
                                text: 'Upload any CSV, XLS, or XLSX files with entity information.',
                                image: 'https://static.hsappstatic.net/ui-images/static-2.312/optimized/import-file.svg',
                            },
                            {
                                name: 'Stream from an endpoint',
                                value: 'stream',
                                text: 'Import a URL pointing to a data stream (IOT sensors, data APIs etc.)',
                                image: 'https://static.hsappstatic.net/ui-images/static-2.312/optimized/import-opt-out-list.svg',
                            },
                        ],
                        route: '/type',
                    },
                    {
                        index: 1,
                        name: 'stream',
                        text: 'Set Stream Endpoint',
                        title: 'Set your stream endpoint',
                        subtitle: 'Please make sure to enter a valid url to the field bellow.',
                        infobox: null,
                        route: '/stream',
                    },
                    {
                        index: 2,
                        name: 'metadata',
                        text: 'Add Metadata',
                        title: 'Add some final useful information',
                        subtitle: 'Adding some final information about your dataset, will help us manage it better.',
                        infobox: 'What does this mean?',
                        route: '/metadata',
                    },
                    {
                        index: 3,
                        name: 'finished',
                        text: 'Finished',
                        title: 'Congratulations! Your data have been added successfully to the Data Platform!',
                        subtitle: 'Thank you for using the Data Integration Tool!',
                        infobox: null,
                        route: '/finished',
                    },
                ],
            },
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to get the steps (Server)',
        });
    }
});

module.exports = router;
