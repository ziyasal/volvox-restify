import {FrameworkProvider} from 'microphone-core'

import restify from 'restify';
import StatusController from './status'

export default class RestifyProvider extends FrameworkProvider {

    constructor(configuration, logger) {
        super();
        this._configuration = configuration;
        this._logger = logger;
    }

    start(server, serviceName, version) {

        let app = server || restify.createServer();
        var port = this._configuration.getPort() || 8080;
        app.get('/status', StatusController.respond);

        return new Promise((resolve, reject)=> {
            app.listen(port, (err) => {
                if (err) return reject(err);

                this._logger.info(`Example app listening on port ${port}!`);
                resolve(app);
            });
        });
    }
}