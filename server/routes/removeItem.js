var router = require('express').Router();

//get user data
router.delete('/', async (req, res) => {
    const { id, apiKey } = req.query; //if id is given, the request is detailed for the specific id, otherwise detailed is set to false
    const results = await fetch(`http://52.214.72.17:8080/schema-api-1.0/entity/delete?apikey=${apiKey}&id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (results.ok) {
        res.send({
            status: 'ok',
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to delete the item (Server)',
        });
    }
});

module.exports = router;
