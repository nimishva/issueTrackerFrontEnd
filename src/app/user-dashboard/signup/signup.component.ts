import { Component, OnInit, Input,EventEmitter,Output,SimpleChanges } from '@angular/core';
import { MainService } from '../../main.service';

//importing toastr
import { ToastrService } from 'ngx-toastr';

import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[]
})
export class SignupComponent implements OnInit {

    //Forms inputs 
    public user :any;
    public pass :any;
    public firstName :any;
    public lastName :any
    public emailId:any;
    public countryName:any = "IN";
    public countryCodeInput :any = "91";
    public mobile_no:any;


    public countryList :any = [];
    public countryCode :any;
    public seletedCountry:string;
    public selectedCountryCode:string;
    public selectedCountryName :string = "";

  constructor(
    private apiService:MainService,
    private toastr:ToastrService,
    private route:Router
    ){ } //Contructor ends 

  ngOnInit() {

  // this.countryCodeService.getCountryPhoneCode()
  // .subscribe(data => {
  //    this.countryCode = data;
  // }); // Country code ends here
  

  // this.countryCodeService.getCountryCode()
  // .subscribe(data => {
  //   for(let dt in data){
  //     let object = {"code":dt,"name":data[dt]};
  //     this.countryList.push(object);
  //   }

  // });// CountryList ends here

  }  //ngOnInit ends here


  countrySelected(event:any){
    this.seletedCountry = event.target.value;
    for(let code in this.countryCode){
      if(this.seletedCountry == code){
        this.countryCodeInput = this.countryCode[code];
      }
    }
  } // countrySelected ends here


formSubmitted(){
  
    let signupData = {

      username  : this.user,
      password  : this.pass,
      firstName : this.firstName,
      lastName  : this.lastName,
      email     : this.emailId
}; //Signup data object ends here 
  
this.apiService.signup(signupData)
.subscribe((apiResponse)=>{

  if(apiResponse.status === 200) {
    // console.log(apiResponse);
    this.toastr.success('Signup successfull');
    setTimeout(() => { this.redirectToLoginPage(); },2000);
  }else
  {
    this.toastr.error(apiResponse.message);
  }

},(err)=>{
  console.log(err);
  this.toastr.error('Some error occured');
}); //End of Observable


} // form Submitted Funciton ends here


redirectToLoginPage(){

  this.route.navigate(['/login']);

}


} //Main Class ends here
