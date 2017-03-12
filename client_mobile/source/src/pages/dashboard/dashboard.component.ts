
import { Component }    from '@angular/core';

import { App }          from 'ionic-angular';

@Component (
{
    selector    : 'dashboard'
,   templateUrl : 'dashboard.component.html'
} )
export class DashboardComponent
{
    title           : string    = 'dashboard';

    listof_thing    : any       =
    [
        { name : 'a' }
    ];

    constructor ( public app : App )
    {
        console.log ( `::ctor` );
    }

    ionViewDidLoad ( )
    {
        console.log ( `::ionViewDidLoad` );
    }

}