import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete'

import { PersonalisedDashboardComponent } from './personalised-dashboard/personalised-dashboard.component';
import { IssueDescriptionComponent } from './issue-description/issue-description.component';
import { PersonalizedViewComponent } from './personalized-view/personalized-view.component';

// Imported Syncfusion RichTextEditorModule from richtexteditor package
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentumTableModule } from 'momentum-table';



@NgModule({
  declarations: [PersonalizedViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    AutocompleteLibModule,
    RichTextEditorAllModule,
    PersonalisedDashboardComponent,
    IssueDescriptionComponent,
    PersonalizedViewComponent,
    FontAwesomeModule,
    MomentumTableModule,
  ]
})
export class IssueTrackerDashboardModule { }
