
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'      ).config(),
    Promise     = require ( 'bluebird'    ),
    chalk       = require ( 'chalk'       ),
    express     = require ( 'express'     ),
    morgan      = require ( 'morgan'      ),
    cors        = require ( 'cors'        ),
    compression = require ( 'compression' ),
    http        = require ( 'http'        ),
    bodyParser  = require ( 'body-parser' );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// restapi agent, express instance
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'restapi_agent';

    vm.api =
    {
        ctor            : ctor,

        service_name    : service_name,

        express_get     : express_get,
        http_server_get : http_server_get
    };
    
    vm.app;
    vm.server;

    function ctor ( central_relay, storage_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            vm.app = express ();

            vm.app.use ( morgan ( 'dev' ) );

            vm.app.use ( on_preflight );

            vm.corsOptions =
            {
                origin          : '*',
                methods         : [ 'POST', 'GET' ],
                exposedHeaders  : [ 'Content-Encoding', 'Content-Length', 'Content-Range' ]
            };

            vm.app.use ( '*', cors ( vm.corsOptions ) );

            vm.app.use ( compression (

                {
                    filter : function ( req, res )
                    {
                        return ( /json|text|javascript|css/ ).test( res.getHeader( 'Content-Type' ) );
                    },

                    level  : 9
                }

            ) );

            vm.app.use ( bodyParser.json ( ) );

            vm.app.use ( bodyParser.urlencoded ( { extended: true, parameterLimit: 1048576 } ) );

            // ////////////////////////////////////////////////////////////////
            //
            // subscriptions

            vm.central_relay.subscribe ( constant_server_restapi.restapi_listen,
                                         on_central_relay_restapi_listen );

            // ////////////////////////////////////////////////////////////////

            console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

            retval = true;

            resolve ( retval );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function on_preflight ( req, res, next )
    {
        res.header ( "Access-Control-Allow-Origin", "*" );

        res.header ( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );

        next();
    }

    function express_get ()
    {
        return vm.app;
    }

    function http_server_get ()
    {
        return vm.server;
    }

    function on_central_relay_restapi_listen ( data, envelope )
    {
        vm.server  = http.createServer ( vm.app );

        console.log ( chalk.green ( 'starting system listener on -', process.env.SERVER_RESTAPI_PORT ) );

        vm.server.listen ( process.env.SERVER_RESTAPI_PORT, function ( )
        {
            console.log ( chalk.green ( 'system online and listening : ', vm.server.listening ) );

            vm.central_relay.publish ( constant_server_restapi.restapi_listening, {} );

        } );
    }

    return vm.api;
};
