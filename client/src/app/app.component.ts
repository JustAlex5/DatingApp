import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { User } from './_models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users:any;

  constructor(private http:HttpClient, private accountService: AccountService){}

  ngOnInit(){
    this.getUser()
    this.setCurrentUser()
  }

  setCurrentUser(){
    const user:User= JSON.parse(localStorage.getItem('user')||'{}');
    this.accountService.setCurrentUser(user);

  }
  getUser() {
    this.http.get('https://localhost:5001/api/users').subscribe(response =>{
      this.users=response;
    },error =>{
      console.log(error);
    }
    )
  }

}
