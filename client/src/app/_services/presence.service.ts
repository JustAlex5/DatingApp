import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import { User } from '../_models/users';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl=environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUSersSource= new BehaviorSubject<string[]>([]);
  onlineUsers$= this.onlineUSersSource.asObservable();


  constructor(private toastr:ToastrService, private router:Router) { }


  ctreateHubConnection(user:User){
    this.hubConnection= new  HubConnectionBuilder().withUrl(this.hubUrl + 'presence', {
      accessTokenFactory:() => user.token

    }).withAutomaticReconnect().build()

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline',username =>{
      this.onlineUsers$.pipe(take(1)).subscribe(usernames =>{
        this.onlineUSersSource.next([...usernames,username])
        console.log(this.onlineUSersSource.next([...usernames,username]))
      })
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames =>{
        this.onlineUSersSource.next([...usernames.filter(x => x !== username)])
      })
    })

    this.hubConnection.on('GetOnlineUsers',(username:string[])=>{
        this.onlineUSersSource.next(username);
    })

    this.hubConnection.on('NewMessageReceived', ({username, knowAs}) =>{
      this.toastr.info(knowAs + ' has send you message').onTap
        .pipe(take(1)).subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'))
    })



  }

  stopHubConnection(){
    this.hubConnection.stop().catch(error => console.log(error));
  }
}


