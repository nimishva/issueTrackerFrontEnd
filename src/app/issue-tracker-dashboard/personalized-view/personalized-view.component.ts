import { Component, OnInit, Input, Output ,EventEmitter ,SimpleChanges} from '@angular/core';
import { MainService } from '../../main.service';
import { ItSocketService } from '../../it-socket.service'

@Component({
  selector: 'app-personalized-view',
  templateUrl: './personalized-view.component.html',
  styleUrls: ['./personalized-view.component.css']
})
export class PersonalizedViewComponent implements OnInit {
  @Input() allUsers:any;
  @Input() reloadData:any;
  @Input() newIssueData:any;
  @Output() emitIssueId = new EventEmitter<string>();
  public allUserData:any;
  countries = [];
  currentUser:string;
  dataLoaded:boolean = false;
  public tableData = [];
  emptyMsg: string = 'loading...';

  constructor( private http:MainService,private socket:ItSocketService) { }

  ngOnInit() {

  //  this.loadIssueDescriptionData(); //Loading all issue description data
    setTimeout(() => {
      this.dataLoaded = true;
    }, 2000)


    this.currentUser = this.http.getUserInfoFromLocalStorage().userId;
  } //ngOninit Ends here 

  ngOnChanges(change:SimpleChanges){
    
        if(change.newIssueData){
          this.tableData = [];
          this.tableData = change.newIssueData.currentValue;
        }
        
      }

  // ngAfterViewInit(): void {


  //  }//ngAfterViewInit

  loadIssueDescriptionData(){
    this.tableData = [];
    let i =1;
    this.http.getAllIssueData()
    .subscribe((apiResponse)=>{
     // console.log(apiResponse);
     console.log("Loading");
      apiResponse.data.forEach(data => {
        
        let user = this.http.getNameOfUser(this.allUsers,data.reportedBy);
        console.log(data.issueId);
        this.tableData.push(
          
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
      });
      console.log(this.tableData);
    })

    
  }// loadDescriptionData

  //DataTable events
  rowClick(e){
    this.emitIssueId.emit(e.data.id);
  }

} //Main Class ends here
