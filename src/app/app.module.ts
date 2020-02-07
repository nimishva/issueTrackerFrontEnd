import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-dashboard/login/login.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

//Services
import { MainService } from './main.service';

//Toaster Module
import { ToastrModule } from 'ngx-toastr';

//FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IssueDescriptionComponent } from './issue-tracker-dashboard/issue-description/issue-description.component';
import { PersonalisedDashboardComponent } from './issue-tracker-dashboard/personalised-dashboard/personalised-dashboard.component';
import { FormsModule } from '@angular/forms';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

// Imported Syncfusion RichTextEditorModule from richtexteditor package
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

//Momentum Table Module
import { MomentumTableModule } from 'momentum-table';
import { IssueTrackerDashboardModule} from './issue-tracker-dashboard/issue-tracker-dashboard.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    UserDashboardModule,
    IssueTrackerDashboardModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    AutocompleteLibModule,
    RichTextEditorAllModule,
    MomentumTableModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'',component:LoginComponent},
      {path:'*',component:LoginComponent}
    ])
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
