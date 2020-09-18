const express = require('express');
const axios = require('axios');
const github = require('octonode');

const app = express();

app.get('/api/repositories', async (req, res) => {
    let repoName = req.query.name;
    try {
        let client = createGitClient(req.headers.token);
        let repo =  await listRepo(client, repoName);
        res.status(200).send(repo);
    } catch (error) {
        res.status(error).send('Ops');
    }
});

function createGitClient(token) {
    if (!token) {
        throw 403;
    }
    return github.client(token);
}

async function listRepo(client, name = '') {
    return new Promise((resolve, reject) => {
        let ghme = client.me();
        ghme.info((err, body) => {
            if (err) throw 500;
            let login = body.login;
            let queryParam = 'user:' + login + " " + (name != ''? name +' in:name': '');
            let query = {q: queryParam};
            client.search().repos(query, function(err, body, header) {
                if (err) throw 500;
                let repos = body.items.map(function(repo){
                    return {
                        'name' : repo.name,
                        'url' : repo.url,
                        'language': repo.language
                    }
                });
                resolve({'repositories': repos});
            });
        })
    })
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);

module.exports = server;