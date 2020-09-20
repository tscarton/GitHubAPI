/**
 * GitController class
 * Frameworks used:
 * - Octonode : Framework to access Git
 */
const github = require('octonode');
const logger = require('./Log');

class GitController {
    /**
     * Method to create a Git client
     * @param {String} token - The GitHub Access token
     * @returns {any}
     */
    static createGitClient(token) {
        logger.debug('Creating GitClient');
        if (!token) {
            logger.error('Token not provided');
            throw 403;
        }
        return github.client(token);
    }

    /**
     * Method to list the repositories. 
     * @param {any} client
     * @param {String} name
     * @returns {JSON} The list of repositories
     */
    /* istanbul ignore next */
    static async listRepo(client, name) {
        logger.debug('List repo param: ' + name);
        return new Promise((resolve, reject) => {
            if (!client) {
                logger.error('Client does not exist');
                reject(500);
            }
            let ghme = client.me();
            ghme.info((err, body) => {
                if (err) {
                    logger.error('It was not possible to load the Github user info');
                    reject(500);
                } else {
                    let login = body.login;
                    // Building the Query to search for repos (name is optional)
                    let queryParam = 'user:' + login + " " + (name != '' ? name + ' in:name' : '');
                    let query = { q: queryParam };
                    logger.info('query param: %s', queryParam);
                    
                    /**
                     * I am using client.search.repos instead of ghme.repos because I can pass
                     * the repo name as a filter to bring just the repos I want (or all of them), the second method does not allow 
                     * this filter, so in this case I would need to bring all the repos and filter in memory.
                     * https://www.npmjs.com/package/octonode
                     */
                    client.search().repos(query, function (err, body, header) {
                        if (err) {
                            logger.error('It was not possible to load the Github user repos');
                            reject(500);
                        } else {
                            let repos = body.items.map(function (repo) {
                                return {
                                    'name': repo.name,
                                    'url': repo.html_url,
                                    'language': repo.language
                                }
                            });
                            resolve({ 'repositories': repos });
                        }
                    });
                }
            })
        })
    }
    
    /**
     * Get the list of repos (main method called by App.js)
     * @param {Object} req
     * @param {Object} res
     * @returns {res} - The HTTP response
     */
    static async getRepos(req, res) {
        let name = req.query.name;
        if (!name) {
            name = '';
        }
        let token = req.headers.token;
        try {
            let client = GitController.createGitClient(token);
            let repos = await GitController.listRepo(client, name);
            logger.debug('Repos found: ', repos);
            /* istanbul ignore next */
            res.status(200).send(repos);
        } catch (error) {
            res.status(error).send('Error');
        }
    }
}

module.exports = GitController;