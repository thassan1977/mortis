
import { NgModule }                 from '@angular/core';

import { IonicApp, IonicModule }    from 'ionic-angular';
import { IonicStorageModule }       from '@ionic/storage';

import { AppComponent }             from './app.component';

import { SocketService }            from '../services/socket.service';

import { DashboardComponent }       from '../pages/dashboard/dashboard.component';
import { FlagComponent }            from '../pages/flag/flag.component';
import { MailComponent }            from '../pages/mail/mail.component';
import { SettingsComponent }        from '../pages/settings/settings.component';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   DashboardComponent
    ,   FlagComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    imports         :
    [
        IonicModule.forRoot(AppComponent)
    ,   IonicStorageModule.forRoot()
    ],
    providers       :
    [
        SocketService
    ],
    entryComponents :
    [
        AppComponent
    ,   DashboardComponent
    ,   FlagComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    bootstrap       :
    [
        IonicApp
    ]
} )
export class AppModule { }
