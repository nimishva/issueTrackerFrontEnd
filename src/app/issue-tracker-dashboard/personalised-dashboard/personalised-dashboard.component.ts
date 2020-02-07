import { Component, OnInit,ViewChild,TemplateRef,Input } from '@angular/core';
import { Router} from '@angular/router'
import {  } from 'ng-bootstrap';
import { MainService } from '../../main.service';

import { Cookie } from 'ng2-cookies';
//Taostr
import { ToastrService } from 'ngx-toastr';
//Services
import { ItSocketService} from '../../it-socket.service';

import { pipe } from 'rxjs';

@Component({
  selector: 'app-personalised-dashboard',
  templateUrl: './personalised-dashboard.component.html',
  styleUrls: ['./personalised-dashboard.component.css']
})
export class PersonalisedDashboardComponent implements OnInit {
  @ViewChild('newEventModal', { static: true })  // Modal Window
  newEventModal: TemplateRef<any>; // Modal window 
  public allUsers:any[]=[] //Getting all users from API
  public reloadData:boolean;
  public emittedIssueId:string
  public loggedUser:string;
  public loggedUserData:any;

  public issueArrayClone = [];
  public newIssueData:any;

  public viewMode:string = "dashBoard";

   //Search users
   public name:string;
   public searchUsers:any = "";
   public keyword = "title"
   public searchUserPlaceholder:string = "Search User";
   public userWiseloadedEvents:any =[];

  constructor( private http:MainService,private socketService:ItSocketService,private toaster:ToastrService,private router:Router ) { }

  ngOnInit() {

     this.loggedUserData = this.http.getUserInfoFromLocalStorage();
     this.loggedUser = this.loggedUserData.firstName;
     this.setUserOnline();
     this.getUserData()
     this.listenToOwnUserId();
     this.getAllData();
     this.getAllIssueData();

  
  }//ngOnint ends here..

  setUserOnline(){
    let authToken = Cookie.get('authtoken');
    console.log(authToken);
    this.socketService.setUserOnline(authToken);
  } //Setting user online

  listenToOwnUserId(){
    this.socketService.getOwnUserId(this.loggedUserData.userId)
    .subscribe((response)=>{
      console.log(response.data.updatedDataType);
      this.getAllData();
      this.showToaster(response.data.issueId,response); 
      this.getAllIssueData();
    })
  }


  showToaster(id,data) {
      
   let toast =  this.toaster.success(`${data.data.updatedDataType} Updated/Created`, 'Notification');
   toast.customId = id;
   toast.onTap.subscribe(()=>{
    this.emittedIssueId = toast.customId;
    this.viewMode = "entry";

    //console.log(this.emittedIssueId);
   })
    //console.log(id.customerId);

  }

  getAllData(e?){

    let tableArray = [];
    let i = 1;
    this.http.getAllIssueData()
    .subscribe((apiResponse)=>{
      for(let data of apiResponse.data){
    // apiResponse.data.forEach(data => {
      let user = this.http.getNameOfUser(this.allUsers,data.reportedBy);
          
          // console.log(data.issueId);
           tableArray.push(
             
             {
               'id'        : data.issueId,
               'sl'        : i,
               'title'     : data.title,
               'status'    : data.status,
               'reporter'  : user,
               'date'      : data.reportedDate
             }
           )
          
     
        
        i++;
      }
    // });
    this.newIssueData = tableArray;
  })

  console.log(this.newIssueData);
} //End of get All Data

  getUserData(){
    this.http.getUserData()
    .subscribe((users)=>{
      users.data.forEach(usr => {
        this.allUsers.push(usr);
      });
    })
  } //GetUserData

  getAllIssueData(){
    this.http.getAllIssueData()
    .subscribe((apiResponse)=>{
      apiResponse.data.forEach(data => {
        this.issueArrayClone.push(data.title);
      });
   
    })
  }

  fetchIssueData(e){
    let dt = [];
    let i = 1
    this.http.getAllIssueData()
    .subscribe((apiResponse)=>{
      for(let data of apiResponse.data){
        let user = this.http.getNameOfUser(this.allUsers,data.reportedBy);
        if(data.title == e){
          dt.push( {
            'id'        : data.issueId,
            'sl'        : i,
            'title'     : data.title,
            'status'    : data.status,
            'reporter'  : user,
            'date'      : data.reportedDate
          });
        }
        i++
      };
      this.newIssueData = dt;
    })
    console.log(this.newIssueData)
  }

  loadissueData(e){
    this.emittedIssueId = e;
    this.viewMode = "entry";
  }

  closeEntryWindow(){
    this.viewMode = "dashBoard";
  }

  openEntryWindow(){
    this.emittedIssueId = "";
    this.viewMode = "entry";
  }


  logout(){
    Cookie.deleteAll();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

} //Main class ends here
