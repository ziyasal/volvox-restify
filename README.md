# microphone-restify
![](https://avatars3.githubusercontent.com/u/16361502?v=3&s=200)  ![](https://github.com/restify/node-restify/raw/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true)  

Restify.js provider for microphone.js Microservice framework

[![Build Status](https://travis-ci.org/microphonejs/microphone-restify.svg?branch=master)](https://travis-ci.org/microphonejs/microphone-restify) [![Coverage Status](https://coveralls.io/repos/github/microphonejs/microphone-restify/badge.svg?branch=master)](https://coveralls.io/github/microphonejs/microphone-restify?branch=master)

Preview
==========

**Sample code `Consul`**
```js
import {Cluster, GuidGenerator, FrameworkProvider, Configuration} from 'microphone-core';
import ConsulProvider from 'microphone-consul';
import RestifyProvider from 'microphone-restify';

import restify from 'restify'
import CustomerController from './customers'
import Logger from './logger'

async function main() {
    try {
        let server = restify.createServer();
        let customers = new CustomerController();
        server.get('/customers', customers.index);

        let logger = new Logger();
        let configuration = new Configuration();

        let clusterProvider = new ConsulProvider(null, logger);
        let frameworkProvider = new RestifyProvider(configuration, logger);
        let guidGenerator = new GuidGenerator();
        let cluster = new Cluster(clusterProvider, frameworkProvider, guidGenerator);

        await cluster.bootstrap(server, "customers", "v1");
        console.log("STARTED");
    } catch (error) {
        console.error(error);
    }
}
```

**Api Controller**
```js
class CustomerController {
    index(req, res, next) {
        res.send({
            customerName: "Test customer",
            customerId: 666
        });

        next();
    }
}
```
