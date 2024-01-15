import { State } from '@ngxs/store';
import { EmployeesPositionHierarchyComponent } from './employees-position-hierarchy/employees-position-hierarchy.component';
import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NgxsModule } from '@ngxs/store';
import { PositionsComponent } from './positions/positions.component';
import { UserutilityService } from './services/positionutility.service';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { Appstate } from './states/app.state';
import { EmployeePositionState } from './states/employee-position.state'
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { EmployeePositionService } from './services/employee-position.service';
import { RegistrationFormComponent } from './registration-form/registration-form.component';





registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesPositionHierarchyComponent,
    PageNotFoundComponent,
    FooterComponent,
    NavbarComponent,
    EmployeesListComponent,
    PositionsComponent,
    TreeViewComponent,
    RegistrationFormComponent




  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AngularFireModule.initializeApp(environment.firebase),
    NzIconModule,
    NzTableModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([]),
    NgxsModule.forRoot([Appstate]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,




  ],

  providers: [{ provide: NZ_I18N,
    useValue: en_US },
     UserutilityService, EmployeePositionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
