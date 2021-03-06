
import { Component, OnInit }    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';

import { LayoutService  }       from '../../services/layout.service';
import { SocketService }        from '../../services/socket.service';

@Component (
{
    selector    : 'dashboard'
,   templateUrl : './dashboard.component.html'
,   styleUrls   : ['./dashboard.component.css']
} )
export class DashboardComponent implements OnInit
{
    current_height:         string;
    subscription:           Subscription;

    constructor ( private _layoutService : LayoutService,
                  private _socketService : SocketService )
    {
    }

    ngOnInit ( ) : void
    {
        this.subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this._socketService.engine_init();

    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

}
