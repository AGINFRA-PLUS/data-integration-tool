const fs = require('fs');

const router = require('express').Router();
const multer = require('multer');
const FormData = require('form-data');

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
        formData.append('file', fs.createReadStream(dir + '/' + filename));
        formData.append('name', metadata.title);
        formData.append('description', metadata.description);
        formData.append('resource_type', 'CSV');
        const upload = await fetch(
            `https://workspace-repository.d4science.org:443/storagehub/workspace/items/75b7db1e-e0b8-4020-9699-29b82a3af1ee/create/FILE?gcube-token=04e93ead-2ab3-4a1d-847e-f5b32eef61b2-843339462`,
            {
                method: 'POST',
                headers: {
                    'gcube-token': '04e93ead-2ab3-4a1d-847e-f5b32eef61b2-843339462',
                },
                body: formData,
            },
        );
        if (upload.ok) {
            const uploadId = await upload.text();
            const uploadPublicLink = await fetch(
                `https://workspace-repository.d4science.org:443/storagehub/workspace/items/${uploadId}/publiclink?gcube-token=04e93ead-2ab3-4a1d-847e-f5b32eef61b2-843339462`,
            );
            if (uploadPublicLink.ok) {
                const publicLink = await uploadPublicLink.text();
                const body = JSON.stringify({
                    name: metadata.title,
                    url: publicLink.replace("\n","").replace(/["']/g, ""),
                    description: metadata.description,
                });
                fetch(`https://gcat.d4science.org/gcat/items/${metadata.dataset}/resources`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'gcube-token': '04e93ead-2ab3-4a1d-847e-f5b32eef61b2-843339462',
                    },
                    body,
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
                        res.send({ status: 'ok' });
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                res.send({response: 'err'});
            }
        } else {
            res.send({response: 'err'});
        }
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
