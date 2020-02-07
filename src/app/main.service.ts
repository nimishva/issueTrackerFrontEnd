import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  //private apiUrl = "http://localhost:3000/api/v1/"
  private apiUrl = "http://api.resfeber.online/api/v1/"
  constructor(private http:HttpClient) {



   }

    public signup:any = (data)=>{
      try {
        return this.http.post(this.apiUrl+"users/signup",data);
      } catch (err){
        return this.handleError(err);
      }
    } //Signup Function ends


    public signInFn:any = (data)=>{
      try {
        return this.http.post(this.apiUrl+"users/signIn",data);
      }catch(err){
        return this.handleError(err);
      }
    } //SignIn Funciton ends 


    public getIssueData:any = (issueId)=>{
      return this.http.post(this.apiUrl+"issueTracker/getIssueData",issueId);
    }

    public getUserData:any=()=>{
      return this.http.get(this.apiUrl+"users/getAll");
    }

    public getAllIssueData:any=()=>{
      return this.http.get(this.apiUrl+"issueTracker/getAllIssuedata")
    }


    public getUserInfoFromLocalStorage = () => {
      return JSON.parse(localStorage.getItem('userData'));
    } // Get User info ends here
    
    public setUserInfoInLocalStorage = (data) => {
       localStorage.setItem('userData',JSON.stringify(data));
    } // Set User info ends here

   public  getNameOfUser = (allUsers,id)=>{
      for(let a of allUsers){
        if(a.userId == id){
          return a.username;
        }
      }
    }//Get Name of User


    public  getIdOfUser = (allUsers,name)=>{
      for(let a of allUsers){
        if(a.username == name){
          return a.userId;
        }
      }
    }//Get userID of User

    //Global error handler
    private handleError(err:HttpErrorResponse){

      let errorMessage = "";
      if(err.error instanceof Error){
      errorMessage = `An Error occured. ${err.error.message}`;
      }else{
       errorMessage = `Server returned code:${err.status} error Message is :${err.error.message}`; 
      }
     return errorMessage;
   } //ErrorHandler ends

} //Main Class ends
