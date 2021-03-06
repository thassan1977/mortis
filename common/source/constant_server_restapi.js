
( function ( window )
{
    'use strict';

    var const_server_restapi =
    {
        restapi_listen      : 'restapi_listen',     // indicates that the http server should lifted
        restapi_listening   : 'restapi_listening'   // indicates that the http server has lifted
    };

    // attach to 'module.exports' if it exists, else attach to 'window'.
    // more robust : check that 'window' is a thing.

    if ( 'undefined' !== typeof module && 'undefined' !== typeof module.exports )
    {
        module.exports = const_server_restapi;

    } else
    {
        window.const_server_restapi = const_server_restapi;
    }

} ) ( this );