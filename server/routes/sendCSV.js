const fs = require('fs');

const router = require('express').Router();
const multer = require('multer');

const upload = multer();

router.post('/', upload.single('file'), async (req, res) => {
    const { csv, apiKey } = req.body;
    const jsonString = req.body.json;
    const { file } = req;
    const { type, metadata, mappings, stream, community } = JSON.parse(jsonString);
    if (community === 'inra') {
        var dir = '/tmp/' + req.session.id;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var filename = file.originalname + '.csv';
        var filepath = dir + '/' + filename;
        fs.writeFileSync(filepath, csv);

        var formData = new FormData();
        formData.append('upload', fs.createReadStream(dir + '/' + filename));
        formData.append('package_id', metadata.dataset);
        formData.append('name', metadata.title);
        formData.append('resource_type', 'CSV');
        formData.append('notes', metadata.description);
        formData.append('tags', metadata.tags.map(key => ({ name: key })));
        fetch('http://ckan-aginfra.d4science.org/api/3/action/resource_create', {
            method: 'POST',
            headers: {
                'X-CKAN-API-Key': '841543f3-5633-4478-bcd5-064aeeb14df4-843339462',
            },
            body: formData,
        })
            .then(function(response) {
                if (response.status >= 400) {
                    console.log(response);
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(function(r) {
                console.log('done');
                fs.unlink(filepath, function() {});
                res.send({ response: 'ok' });
            })
            .catch(function(error) {
                console.log(error);
            });
    } else {
        const body = [
            {
                id: null,
                dataSource: community,
                entityType: type === 'file' ? 'internal_dataset' : 'internal_stream',
                published: true,
                information:
                    type === 'file'
                        ? {
                              csv: csv,
                              json: jsonString,
                              fileBuffer: file.buffer,
                              mimeType: file.mimetype,
                              size: file.size,
                              encoding: file.encoding,
                              originalname: file.originalname,
                              schema: mappings,
                          }
                        : {
                              url: stream,
                              json: jsonString,
                              schema: mappings,
                          },
                tags: metadata.tags,
                title: metadata.title,
                description: metadata.description,
                createdOn: new Date(),
            },
        ];
        let response = await fetch(`http://52.214.72.17:8080/schema-api-1.0/entity/smart-scheme/mass-create?apikey=${apiKey}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            res.send({
                status: 'ok',
            });
        } else {
            res.send({
                status: 'err',
                message: 'There was an error trying to upload file (Server)',
            });
        }
    }
});

module.exports = router;
