/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

// Imports added over Ngx-admin

// Design Imports
import { MaterialDesignModule } from './common/modules/material-design/material-design.module';
import { MAT_DATE_LOCALE } from '@angular/material';

// Auth Imports
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { httpInterceptorProviders } from './common/misc/http-interceptors';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetterFn } from './common/functions/tokenGetterFn';

// Notification and Service Worker Imports
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './common/services/messaging.service';

// Misc Imports
import { environment } from '../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),

    MaterialDesignModule,

    // NbAuthModule Strategy Settings Override
    // Refer Ngx Admin Docs
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token.access_token',
          },
          baseEndpoint: environment.baseUrl,
          login: {
            // ...
            endpoint: '/api/token/',
          },
        }),
      ],
      forms: {},
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter:  tokenGetterFn,
      },
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    MaterialDesignModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },

    // Barrel of Http Interceptors
    httpInterceptorProviders,
    MessagingService,
  ],
})
export class AppModule {
}
