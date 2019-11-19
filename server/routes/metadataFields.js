var router = require('express').Router();

//get metadata
router.get('/', async (req, res) => {
    let metadata = [];
    const { community } = req.query;
    const url = `http://52.214.72.17:8080/mock/${community}/metadata.json`;
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.entityType === 'metadata') {
            let fields = jsonResponse.fields;
            metadata = fields.map(field => ({
                name: field.name,
                required: true,
                label: field.name,
                type: field.input,
            }));
        }
        res.send({
            status: 'ok',
            data: metadata,
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to get the necessary metadata fields (Server)',
        });
    }
});

module.exports = router;
