import { Component, OnInit,ViewChild,TemplateRef, ɵConsole, Input,OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent, UndoRedoCommands } from '@syncfusion/ej2-angular-richtexteditor';
import { ItSocketService } from '../../it-socket.service';
import { MainService } from '../../main.service';

import {faTrash,faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.css'],
  providers:[ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class IssueDescriptionComponent implements OnInit {

  @ViewChild('fromRTE',{static:true}) rteObj:RichTextEditorComponent;
  public value:any = null;
  @Input() allUsers:any[];
  @Input() emittedIssueId:any;
  @Input() newIssueData:any;
  @Output() closeWindow = new EventEmitter<string>();
  //Form Variables
  issueTitle:string;
  status:string = "Pending";
  reportedDate : any = new Date();
  comments :any[] = [];
  watcher  :any[] = []; 
  eventFormButtonName:string = "Save";
  descPlaceHolder:string="Description";
  statusArray:any[] = ['in- progress', 'in-test', 'done','backlog'];
  //AutoCOmplete 
  placeholder:string = "Choose Assignee";

  loggedUserData:any;

  faTrash = faTrash;
  faClose = faWindowClose;

  //AutoComplete input
  public name:string;
  public userArray      :any    = [];
  public userArrayClone :any    = [];
  public placeholderAssignee    = 'Choose assignee';
  public issueAssignee:string;
  public assigneeEdit:string="";

  //
  viewMode:string = "input";

  constructor(private http:MainService,private itSocket:ItSocketService) { }

  ngOnInit() {
    this.loggedUserData = this.http.getUserInfoFromLocalStorage();
    //console.log(this.loggedUserData);
    this.getAllUserData();
    this.rteObj.insertImageSettings.saveFormat = "Base64";
    if(this.emittedIssueId != ""){
      this.viewMode = "edit";
    }
   console.log(this.viewMode);
  }//ngOnInit

  ngAfterViewInit(): void {
    if(this.viewMode == "edit"){
    setTimeout(() => {
      this.loadIssueDescription();
     }, 600); 
    }//If ends here 
  }//ngAfterViewInit

  ngOnChanges(change:SimpleChanges):void{

    if(change.newIssueData){
      this.loadIssueDescription();
    }else if(change.emittedIssueId){
      this.loadIssueDescription();
    }
  }

  updateStatus(e:any){
    //console.log(this.rteObj.valueChange);
  }

  getAllUserData(){
    this.http.getUserData()
    .subscribe((users)=>{
      users.data.forEach(user => {
        this.userArray.push(user.username);
      });
    });
    this.userArrayClone = this.userArray;
  } //getAllUserData ends here 


  getUsername(id){
   return this.http.getNameOfUser(this.allUsers,id);
  }

  newIssueSubmitted(){

    let submittedIssue =  {
      //eventId:'',
      title: this.issueTitle,
      description : this.rteObj.value,
      status : this.status,
      assignee : this.http.getIdOfUser(this.allUsers,this.issueAssignee),
      reportedDate : this.reportedDate,
      reportedBy  : this.loggedUserData.userId
    };
    //console.log(this.rteObj.imageUploadSuccess)
    this.itSocket.createNewIssueTracker(submittedIssue);
  } //newIssueSubmitted Ends here ..


  loadIssueDescription(){
    this.http.getIssueData({issueId:this.emittedIssueId})
    .subscribe((apiResponse)=>{

      //console.log(apiResponse.data[0]);
      this.issueTitle     = apiResponse.data[0].title;
      this.value          = apiResponse.data[0].description;
      this.status         = apiResponse.data[0].status;
      this.comments       = apiResponse.data[0].comments;
      this.watcher        = apiResponse.data[0].watcher;
      this.reportedDate   = new Date(apiResponse.data[0].reportedDate);  
      this.issueAssignee  = this.http.getNameOfUser(this.allUsers,apiResponse.data[0].assignee);
  
    })

   // console.log(this.issueAssignee);
  } //Load Issue Description data

  updateIssueData(e:any,updatedDataType){
    //console.log(e);
    if((this.viewMode == "edit") && (e != "")){
    let submittedIssue =  {
      //eventId:'',
      issueId:this.emittedIssueId,
      updatedDataType:updatedDataType,
      updatedData : updatedDataType == "description" ?  this.rteObj.value : e ,
      updatedBy   : this.loggedUserData.userId,
      updatedDate : new Date()
     // assignee : this.selectedAttendees,
     // createdBy : this.loggedUser
    };

    if(updatedDataType == "assignee"){
      submittedIssue.updatedData = this.http.getIdOfUser(this.allUsers,e);
    }

    //console.log(submittedIssue);
    this.itSocket.udateIssueDescription(submittedIssue);
    setTimeout(() => {
      this.loadIssueDescription();
    }, 1000);
  } //Update Issue Data
} //UpdateIssueData ends here

deleteComment(e,dt){
  e.preventDefault();
  this.itSocket.deleteComment(dt,this.emittedIssueId);
  setTimeout(() => {
    this.loadIssueDescription();
  }, 1000);
 
} //Delete Comment Ends here

closeEntryWindow(){
 
      this.issueTitle     = "";
      this.value          = "";
      this.status         = "";
      this.comments       = [];
      this.watcher        = [];
      this.reportedDate   = new Date();  
      this.issueAssignee  = "";
      setTimeout(() => {
        this.closeWindow.emit();
      }, 1000);
}


} //Main Class ends here
