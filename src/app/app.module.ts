import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TitleService } from 'src/app/root-components/header/common/title.service';

import { environment } from './../environments/environment';
import { API_URL_GATEWAY } from './api-service.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalApiErrors } from './global.api-errors';
import { ApiErrorsInterceptor } from './modules/api-errors/api-errors.interceptor';
import { ApiErrorsModule } from './modules/api-errors/api-errors.module';
import { AuthCommonModule } from './modules/auth/common/auth.common.module';
import { HeaderComponent } from './root-components/header/header.component';
import { NavigationService } from './root-components/navigation/common/navigation.service';
import { PageService } from './root-components/navigation/common/page.service';
import { NavigationComponent } from './root-components/navigation/navigation.component';
import { IndexModule } from './route-modules/index/index.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApiErrorsModule,
    IndexModule,
    RouterModule,
    MatIconModule,
    AuthCommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
  ],

  providers: [
    {
      provide: API_URL_GATEWAY,
      useValue: environment.gateway,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorsInterceptor,
      multi: true,
    },
    TitleService,
    NavigationService,
    GlobalApiErrors,
    PageService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
