import chai from "chai";
import sinon from "sinon";

import request from 'request';
import RestifyProvider from "../src/index";

import restify from 'restify';

chai.should();

describe("RestifyProvider:", () => {
    let restifyProvider,
        configuration = {
            getPort: function () {
            }
        }
        , logger = {
            info: function (msg) {
            }
        },
        configurationMock, loggerMock;

    beforeEach(() => {

        configurationMock = sinon.mock(configuration);
        loggerMock = sinon.mock(logger);

        restifyProvider = new RestifyProvider(configuration, logger);

    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!restifyProvider).should.be.equal(true);
        });
    });

    describe("#start", () => {
        it("should start new restify server and register status handler", async (done)=> {
            await startTest(null, done);
        });


        it("should attach existing restify server and register status handler", async (done)=> {
            let app = new restify.createServer();
            await startTest(app, done);
        });

        async function startTest(server, done) {
            let port = 3000, statusResponse = 'ok';

            configurationMock.expects("getPort").returns(port).once();
            loggerMock.expects("info").withArgs(`Example app listening on port ${port}!`).once();

            let result = await restifyProvider.start(server, "test-svc", "v1");

            request(`http://localhost:${port}/status`, (error, response, body)=> {

                (!!error).should.be.equal(false);

                body.should.be.equal(statusResponse);

                result.serverInstance.close();
                done();
            });
        }
    });

    afterEach(()=> {
        configurationMock.verify();
        loggerMock.verify();
    })
});