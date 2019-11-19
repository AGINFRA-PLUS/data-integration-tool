var router = require('express').Router();

// get properties
router.get('/', async (req, res) => {
    const { object, community } = req.query;
    const url = `http://52.214.72.17:8080/mock/${community}/${object}.json`;
    const result = await fetch(url);
    if (result.ok) {
        const resultJson = await result.json();
        const { fields } = resultJson.schema;
        const props = Object.keys(fields).map(key => ({ label: key, value: key, ...fields[key] }));
        const validations = props.filter(prop => prop.required).map(prop => prop.value);

        res.send({
            status: 'ok',
            data: {
                properties: props,
                validations: validations,
            },
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to get the object fields (Server)',
        });
    }
});

module.exports = router;
