var router = require('express').Router();

const orDelimiter = '||';

//get user data
router.get('/', async (req, res) => {
    const { id, community, apiKey } = req.query; //if id is given, the request is detailed for the specific id, otherwise detailed is set to false
    const url = `http://52.214.72.17:9091/search/`;

    const results = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apikey: apiKey,
            detail: id ? true : false,
            entityType: 'internal_dataset' + orDelimiter + 'internal_stream',
            strictQuery: id ? { id } : { dataSource: community },
        }),
    });
    if (results.ok) {
        const resultsJson = await results.json();
        res.send({
            status: 'ok',
            data: resultsJson.hits.hits.map(hit => hit['_source']),
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to get the user data (Server)',
        });
    }
});

module.exports = router;
