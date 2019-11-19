var router = require('express').Router();

//get validations
router.get('/', (req, res) => {
    const noError = true; //later using the api will check for errors from the Data Platform
    if (noError) {
        res.send({
            status: 'ok',
            data: {
                validations: {
                    type: {
                        state: 'main',
                        requiredFields: ['type'],
                    },
                    objects: {
                        state: 'main',
                        requiredFields: ['objects'],
                    },
                    file: {
                        state: 'resource',
                        requiredFields: ['file'],
                    },
                    stream: {
                        state: 'main',
                        requiredFields: ['stream'],
                    },
                    mapping: {
                        state: 'mapping',
                        requiredFields: ['name'],
                    },
                    editor: {
                        state: 'main',
                        requiredFields: ['dataEditorValidation'],
                    },
                    metadata: {
                        state: 'main',
                        requiredFields: ['metadata'],
                    },
                },
            },
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to Run the Data Upload Tool - Validations (Server)',
        });
    }
});

module.exports = router;
