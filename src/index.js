import RestifyProvider from './restify-provider';
import {Configuration} from 'volvox-core'
import bunyan from 'bunyan'

export default  (config, logger)=>{
    return new RestifyProvider(
        config || new Configuration(),
        logger ||  bunyan.createLogger({name: "volvox.js"})
    )
};