import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/users";
import {AdminService} from "../../_services/admin.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {RolesModalComponent} from "../../modals/roles-modal/roles-modal.component";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  users: Partial<User[]>
  bsModalRef: BsModalRef;
  constructor(private adminService:AdminService , private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }
  getUsersWithRoles(){
    this.adminService.getUsersWithRole().subscribe(users => {
      this.users=users;
    })
  }

  openRolesModal(user:User){
    const config={
      class:'modal-dialog-centered',
      initialState:{
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values =>{
      const rolesToUpdate={
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate){
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(()=> {
          user.roles=[...rolesToUpdate.roles]
        })
      }
    })
  }
  private getRolesArray(user){
    const roles=[];
    const userRoles=user.roles;
    const avalibleRoles:any[]=[
      {name:'Admin',values: 'Admin'},
      {name:'Moderator',values: 'Moderator'},
      {name:'Member',values: 'Member'}
    ];

    avalibleRoles.forEach(role => {
      let isMatch=false;
      for (const userRole of userRoles) {
        if(role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }

      }
      if(! isMatch){
        role.checked=false;
        roles.push(role);
      }
    })
    return roles;
  }




}
