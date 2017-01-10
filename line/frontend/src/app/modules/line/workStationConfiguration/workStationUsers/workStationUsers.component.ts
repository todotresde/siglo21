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
  @Input() inputUsers: User[] = [];
  @Output() outputUsers = new EventEmitter<User[]>();

  users : User[];
  selectedUser : User;
  selectedUsers : User[];
  
  constructor(private route: ActivatedRoute, private userService: UserService) { 
      this.selectedUsers = this.inputUsers;
      this.selectedUser = new User();
  }

  ngOnInit() : void{
      this.userService.getAll().then(users => this.users = users);
  }

  add(user: User): void {
    this.selectedUsers.push(user);
    this.outputUsers.emit(this.selectedUsers);
  }

  remove(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id)
    this.outputUsers.emit(this.selectedUsers);
  }

}
