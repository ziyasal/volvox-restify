export default class StatusController {
    static respond(req, res, next) {
        res.setHeader('content-type', 'text/plain');
        res.send(200, 'ok');
        next();
    }
}