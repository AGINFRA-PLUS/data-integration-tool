var router = require('express').Router();

//get theme
router.get('/', async (req, res) => {
    const { community } = req.query;
    const url = `http://52.214.72.17:8080/mock/${community}/theme/styling.json`;
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
        res.send({
            status: 'ok',
            data: jsonResponse,
        });
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to get the theme (Server)',
        });
    }
});

module.exports = router;
