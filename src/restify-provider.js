import {FrameworkProvider} from 'volvox-core'

import restify from 'restify';

/**
 *
 */
export default class RestifyProvider extends FrameworkProvider {

    /**
     *
     * @param configuration
     * @param logger
     */
    constructor(configuration, logger) {
        super();
        this._configuration = configuration;
        this._logger = logger;
    }

    /**
     *
     * @param server
     * @param serviceName
     * @param version
     * @returns {Promise}
     */
    start(server, serviceName, version) {

        let app = server || restify.createServer();
        var port = this._configuration.getPort() || 8080;
        let uri = `http://localhost:${port}`;

        return new Promise((resolve, reject) => {

            app.get('/status', (req, res, next) =>{
                res.setHeader('content-type', 'text/plain');
                res.send(200, 'ok');
                next();
            });

            app.listen(port, (err) => {
                if (err) return reject(err);

                this._logger.info(`Example app listening on port ${port}!`);
                resolve({ serverInstance: app, uri: uri });
            });
        });
    }
}