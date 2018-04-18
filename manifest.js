// @ts-check
/// <reference path="./node-modules/express-gateway/index.d.ts" />
const session = require('express-session');

/** @type {ExpressGateway.Plugin} */
const plugin = {
    version: '1.0.0',
    policies: ['session'],
    init: function(pluginContext) {
        pluginContext.registerPolicy({
            name: 'session',
            schema: {                                                                                          
                $id: 'http://express-gateway.io/schemas/policies/session.json',                                  
                type: 'object',                                                                                
                properties: {                                                                                  
                    secret: {                                                                                
                        type: 'string',                                                                        
                        description: 'Session secret'
                    },                                                                                         
                    resave: {                                                                             
                        type: 'boolean',                                                                        
                        description: 'Forces the session to be saved back to the session store, even if the session was never modified during the request.' 
                    },
                    saveUninitialized: {
                        type: 'boolean',
                        description: 'Forces a session that is "uninitialized" to be saved to the store.'
                    }
                }, required: ['secret', 'resave', 'saveUninitialized']                                                       
            },                                                                                                 
            policy: (actionParams) => {
                return session({
                    secret: actionParams.secret,
                    resave: actionParams.resave,
                    saveUninitialized: actionParams.saveUninitialized
                });
            }
        });
    }
};

module.exports = plugin;
