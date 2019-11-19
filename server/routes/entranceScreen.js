var router = require('express').Router();

//get first screen content
router.get('/', (req, res) => {
    const noError = true; //later using the api will check for errors from the Data Platform
    const { community } = req.query;
    if (noError) {
        if (community === 'foodakai') {
            res.send({
                status: 'ok',
                data: {
                    logo: 'https://www.foodakai.com/wp-content/uploads/2017/07/Logo-full.png',
                    title: 'Data Integration Tool',
                    text:
                        'Using the Data Integration Tool, you can transform your data in a way that can be used from our services. You can start by clicking the [Add New] button.' +
                        'You can also check or remove previously uploaded data in the table shown bellow. For any questions regarding the sage of the tool please visit the website www.test.test or contact us.',
                },
            });
        } else {
            res.send({
                status: 'ok',
                data: {
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEX///93s0+vywcAm095tFJvrkTP5MH+/vunzYuZxXrd7NNysUf7/POqxwCtyAAAlkW50S21zh/1+OH4+vbu9ems0ZTZ7eDg6qHn8d9LtHqi17nX5IjH2liIvGWKzKbm77ja5pLu887W6Mq21Z9twZHO32y74cmCuV0AjzjL3GHp8cDD2mvb7+lqrD6616WhyoPS4Xnf6aPD103L6Nc/r3Ht9e+SwXGDyaF/LcuXAAACxElEQVR4nO3c3VbaQBRA4YQGBwgBMUCRam2xGqUF1EL7/m9W7U2ZM1lNyMrPiWt/15k4O6Ar40A8DwAAAAAAAAA0OtxLP5ueUjHzsfCwb3pKxcw/COPLpqdUDCHaEKINIdoQog0h2hCiTTtCjMM5JFeIO0yfdqxHnr9IQ3nI4Zv02TnN9Kt0Ucv0/5lEwuji9LeJ8T5GI/ss0aea323no45Q4FK+hYizEFIUIccIKREhxwgpESHHCCkRIccIKVGekMxFpIaQ0tYjtk70VHNIjhXidCb0tuII461frmwvzzUF/Ie8kouusPmVNaQBOf6LsgiEsJ/jPDXM/VQL3xZ0U0LagBBtCNGGEG0I0YYQbQjRxbze/frZd79tINcjobse0Sje9YXdSho4o+73l7b9soG5W+JgE9rXP8kxavkgd35/Vz7TDHEifiP86zhrKWu85Vjuxbs7vzWLk9D+IxVeZy5bCakSIYRUhBBCKkIIIRV5JyHmLSQ47ghyhHj6Qv7e/Z78imgIcTZohjneWnJM3HSI8daTc9vk6bCQcoz6/mMuHOoNuYlGtuiu0KjHGmabMSW5P36XubOZNuqx2f3Q4iEjQipBCCEVIYSQihBCSEUIeR83jV7KqKumQ9adia3jfjo0ngqHm4kclSe/UmYoxc4xA7GFFfh9Z5g7SqGBWMT77dxnd0Na+oEBQvQhRBtCtCFEG0K0IUQbQrQhRBtCtCFEG0K0IUQbQrQhRBtCtCFEG0J0MSWGNPwQmEUbXpGzXS9T3xfCJHtQrzeVP8tsZ7eW2bas18R4s418wlEKGeL7OQZ15Qe4vTgRP2wTlLU9b7zbrnzCUQo3JMegwAkx1/LLs0mpIe40y5ESIr8+QAghhBBCCCGEEEJIW0Kq4dd992s/X6dMda5HXpexZ5VxJ7mSh6w0Prq1aVwTAAAAAAAAoDx/ANu/lNYrEpvCAAAAAElFTkSuQmCC',
                    title: 'Data Integration Tool',
                    text:
                        'Using the Data Integration Tool, you can transform your data in a way that can be used from our services. You can start by clicking the [Add New] button.' +
                        'You can also check or remove previously uploaded data in the table shown bellow. For any questions regarding the sage of the tool please visit the website www.agroknow.com or contact us.',
                },
            });
        }
    } else {
        res.send({
            status: 'err',
            message: 'There was a problem trying to Run the Data Upload Tool (Server)',
        });
    }
});

module.exports = router;
