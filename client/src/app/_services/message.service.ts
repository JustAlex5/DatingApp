import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {getPaginatedResult, getPaginationHeader} from "./paginationHelper";
import {Message} from "../_models/message";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {User} from "../_models/users";
import {BehaviorSubject, pipe} from "rxjs";
import {take} from "rxjs/operators";
import {group} from "@angular/animations";
import {Group} from "../_models/group";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl=environment.apiUrl;
  hubUrl=environment.hubUrl;
  private hubConncection: HubConnection;
  private messageTheradSource = new BehaviorSubject<Message[]>([]);
  messageThread$= this.messageTheradSource.asObservable();

  constructor(private http:HttpClient) { }

  createHubConnection(user:User, otherUsername:string){
    this.hubConncection= new HubConnectionBuilder().withUrl(this.hubUrl + 'message?user=' + otherUsername, {
      accessTokenFactory: () => user.token
    })
      .withAutomaticReconnect().build()

    this.hubConncection.start().catch(error => console.log(error));

    this.hubConncection.on('ReceiveMessageThread', messages =>{
      this.messageTheradSource.next(messages);
    })

    this.hubConncection.on('NewMessage', message =>{
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageTheradSource.next([...messages , message])
      })
    })

    this.hubConncection.on('UpdatedGroup',(group: Group) =>{
      if (group.connections.some( x => x.username === otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          messages.forEach(message => {
            if(!message.dateRead){
              message.dateRead=new Date(Date.now());
            }
          })
          this.messageTheradSource.next([...messages])
        })
      }
    } )
  }

  stopHubConnection(){
    if(this.hubConncection){
      this.hubConncection.stop();
    }

  }

  getMessages(pageNumber, pageSize, container){
    let params= getPaginationHeader(pageNumber,pageSize);
    params=params.append('Container',container);
    return getPaginatedResult<Message[]>(this.baseUrl+'messages',params, this.http);
  }

  getMessageThread(username:string){
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }

  sendMessage(username:string, content:string){
    return this.hubConncection.invoke('SendMessage',{recipientUsername:username,content}).catch(error => console.log(error));
  }

  deleteMessage(id:number){
    return this.http.delete(this.baseUrl + 'messages/'+ id)
  }
}
