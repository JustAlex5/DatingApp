import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Message } from 'src/app/_models/message';
import {MessageService} from "../../_services/message.service";
import {User} from "../../_models/users";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username:string;
  messageContnet: string;


  constructor(private messageService:MessageService) { }

  ngOnInit(): void {

  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContnet).subscribe(message =>{
      this.messages.push(message);
      this.messageForm.reset();
    })
  }



}
