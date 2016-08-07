# volvox-restify
![](https://avatars3.githubusercontent.com/u/16361502?v=3&s=200)  ![](https://github.com/restify/node-restify/raw/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true)  

Restify.js provider for volvox.js Microservice framework

[![Build Status](https://travis-ci.org/volvoxjs/volvox-restify.svg?branch=master)](https://travis-ci.org/volvoxjs/volvox-restify) [![Coverage Status](https://coveralls.io/repos/github/volvoxjs/volvox-restify/badge.svg?branch=master)](https://coveralls.io/github/volvoxjs/volvox-restify?branch=master)

Preview
==========

**Sample code `Consul`**
```js
import Volvox from 'volvox-core';
import vconsul from 'volvox-consul';
import vrestify from 'volvox-restify';

import restify from 'restify'

async function main() {
    let server = restify.createServer();
    server.get('/customers', (req, res, next) => {
        res.send({
            customerName: "Test customer",
            customerId: 666
        })
    })
    
    let volvox = new Volvox(vconsul(), vrestify());
    await volvox.bootstrap(server, "customers", "v1");
}

main();
```
