
import { Component, OnInit, ViewChild }             from '@angular/core';

import { Events, MenuController, Nav, Platform }    from 'ionic-angular';
import { Splashscreen }                             from 'ionic-native';
import { Storage }                                  from '@ionic/storage';

import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { FlagComponent }        from '../pages/flag/flag.component';
import { MailComponent }        from '../pages/mail/mail.component';
import { SettingsComponent }    from '../pages/settings/settings.component';

export interface PageInterface
{
    title       : string;
    icon        : string;
    logsOut?    : boolean;
    index?      : number;
    component?  : any;
}

@Component (
{
    selector    : 'app-root'
,   templateUrl : './app.component.html'
} )
export class AppComponent implements OnInit
{
    // ////////////////////////////////////////////////////////////////////////
    //
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav

    @ViewChild ( Nav ) nav: Nav;

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    appPages : PageInterface [] =
    [
        {
            title       : 'Dashboard',
            icon        : 'md-home',
            component   : DashboardComponent
        },
        {
            title       : 'Flag',
            icon        : 'md-home',
            component   : FlagComponent
        },
        {
            title       : 'Mail',
            icon        : 'md-home',
            component   : MailComponent
        },
        {
            title       : 'Settings',
            icon        : 'md-home',
            component   : SettingsComponent
        }
    ];

    rootPage: any;

    constructor ( public events     : Events
                , public menu       : MenuController
                , public platform   : Platform
                , public storage    : Storage )
    {
        console.log ( `::ctor` );

        this.rootPage = DashboardComponent;

        this.platformReady ( );

        this.enableMenu ( );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    ngOnInit ( ) : void
    {
        console.log ( `::ngOnInit` );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    enableMenu ( )
    {
        console.log ( `::enableMenu` );

        let loggedIn = true;

        this.menu.enable ( loggedIn, 'loggedInMenu' );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    // call any initial plugins when ready

    platformReady ( )
    {
        console.log ( `::enableMenu` );

        this.platform.ready().then ( () =>
        {
            console.log ( `::enableMenu - platform.ready` );

            Splashscreen.hide();

        } );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    openPage ( page : PageInterface )
    {
        console.log ( `::openPage`, page );

        this.nav.setRoot ( page.component ).catch( () =>
        {
            console.log ( "Didn't set nav root" );

        } );

    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    isActive ( page : any )
    {
        console.log ( `::isActive`, page );

        let childNav = this.nav.getActiveChildNav ( );

        // Tabs are a special case because they have their own navigation

        if ( childNav )
        {
            if ( childNav.getSelected() && childNav.getSelected().root === page.tabComponent )
            {
                return 'primary';
            }

            return;
        }

        if ( this.nav.getActive() && this.nav.getActive().component === page.component )
        {
            return 'primary';
        }

        return;
    }

}
