import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

//SocialLogin Modules
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

//service
import { MainService } from '../../main.service';

//FontAwesome
import { } from '@fortawesome/free-solid-svg-icons';
import { faGoogle,faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username :any;
  public password :any;
  public triggerErrorUser :boolean ;
  public triggerErrorPass :boolean ;

  //Social Login Variables
  public socialUser:string;
  public loggedIn:boolean;

  //Icons
  faGoogle   = faGoogle;
  faFacebook = faFacebook;

  constructor(
    public toaster : ToastrService,
    private router : Router ,
    private apiService : MainService,
    private socialAuthService:AuthService,
    vcr:ViewContainerRef
    
    ) { } //Constructor ends here

  ngOnInit() {

    if(Cookie.get('authtoken')=== "" || Cookie.get('authtoken')=== undefined || Cookie.get('authtoken')=== null )
    {
      this.router.navigate(['/']);
      return false;
    }else{
      this.router.navigate(['/dashBoard']);
    }


  }

  public logInFunction:any = () =>
{
  if((!this.username) && (this.password)) {
    this.triggerErrorUser = true;
    this.triggerErrorPass = false;
  }else if((!this.password) && (this.username)){
    // this.toaster.warning('Enter password');
    this.triggerErrorUser = false;
    this.triggerErrorPass = true;
  }else if((!this.username) && (!this.password)){
    this.triggerErrorUser = true;
    this.triggerErrorPass = true;
  }else {
    this.triggerErrorUser = false;
    this.triggerErrorPass = false;

      let userData = {

        username : this.username,
        password : this.password

      }

    this.apiService.signInFn(userData)
    .subscribe((apiResponse)=>{
      if(apiResponse.status === 200){

            this.toaster.success("Login success");

            Cookie.set('authtoken',apiResponse.data.authToken);
            this.apiService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
            let userName = apiResponse.data.userDetails.username;
            setTimeout(()=>{
              console.log(userName);
              this.router.navigate(['/dashBoard']);
              // if(userName.endsWith("-admin")){
              //   this.router.navigate(['/admin-dash']);
              // }else{
              //   this.router.navigate(['/user-dash']);
              // }
            },1000)
      }else
      {
        console.log(apiResponse.message);
        this.toaster.error(apiResponse.message);
      }
    },(error)=>{
        if(error){
          this.toaster.error("Server Connection Error ,Please try again later");
        }
     });
  
    }

} //LogInFunciton ends here



//Social Login Functions
signInWithGoogle(): void {
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signInWithFB(): void {
  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
} 

signOut(): void {
  this.socialAuthService.signOut();
}

 
} //Class ends here 
