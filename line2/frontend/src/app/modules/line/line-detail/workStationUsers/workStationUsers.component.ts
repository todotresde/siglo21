import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/user';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-workstation-users',
  templateUrl: './workStationUsers.component.html',
  styleUrls: ['./workStationUsers.component.css'],
  providers:[UserService]
})
export class WorkStationUsersComponent implements OnInit {
  @Input() inputUsers: User[];
  @Output() outputUsers = new EventEmitter<User[]>();

  users : User[];
  selectedUser : User;
  selectedUsers : User[];
  
  constructor(private route: ActivatedRoute, private userService: UserService) { 
      this.userService.getUsers().then(users => this.users = users);
      this.selectedUsers = this.inputUsers;
  }

  ngOnInit() : void{
    
  }

  add(user: User): void {
    this.selectedUsers.push(user);
    this.outputUsers.emit(this.selectedUsers);
  }

}
