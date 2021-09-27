import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from 'src/app/_models/message';
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";
import {Member} from "../../_models/member";

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username:string;
  messageContnet: string;
  member:Member;




  constructor(public messageService:MessageService) { }

  ngOnInit(): void {

  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContnet).then(()  =>{
      this.messageForm.reset();
    })
  }



}
