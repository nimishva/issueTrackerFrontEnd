import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItSocketService {

  private url = "http://localhost:3000";
  private socket;

  constructor() { 
    this.socket = io(this.url)
  } //Construcot ends here

    //Listening server 
    public verifyUser = ()=>{
      return Observable.create((observer)=>{
        this.socket.on('verifyUser',data=>{
          observer.next(data);
        })
      })
    } //User verification

    //Listen to our own userId
    public getOwnUserId = (userId)=> {
      return Observable.create((observer)=>{
        this.socket.on(userId,data=>{
          observer.next(data);
        })
      })
    }


     //Emitting to server

    public createNewIssueTracker = (data) => {
        this.socket.emit('new-issue',data);
    } //CreateNewEvent

    public udateIssueDescription:any = (data)=>{
      this.socket.emit('update-issueData',data);
    } //UpdateIssueDescription

    public deleteComment:any = (id,issueId)=>{
      let obj = {
        id:id,
        issueId:issueId
      }
      this.socket.emit('delete-comment',obj);
    } //Delete Comment 

    
     public setUserOnline = (authToken)=>{
      this.socket.emit('setUser',authToken);
  } //Setting up user online

  private handleError(err:HttpErrorResponse){
    let errorMessage = "";
    if(err.error instanceof Error){
        errorMessage = `An Error occured. ${err.error.message}`;
    }else{
       errorMessage = `Server returned code:${err.status} error Message is :${err.error.message}`; 
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  } //ErrorHandler ends

} //Main class ends here
