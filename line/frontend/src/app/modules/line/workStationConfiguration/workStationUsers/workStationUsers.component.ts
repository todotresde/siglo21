import { Component, OnInit , EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User, UserService } from 'app/modules/user';

import { Message } from 'app/shared';

@Component({
  selector: 'app-workstation-users',
  templateUrl: './workStationUsers.component.html',
  providers:[UserService]
})
export class WorkStationUsersComponent implements OnInit, OnChanges {
  @Input() inputClean: boolean = false;
  @Input() inputUsers: User[] = [];
  @Output() outputUsers = new EventEmitter<User[]>();

  message: Message = new Message();
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

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputClean": if(changes["inputClean"].currentValue){this.clean();} break;
          case "inputUsers": 
            if(changes["inputUsers"].currentValue){
              this.selectedUsers = changes["inputUsers"].currentValue;
            } 
            break;
      }
    }
  }

  add(user: User): void {
    if(this.exist(user)){
      this.message.error("error-user-already-assigned");
    }else{
      this.selectedUsers.push(user);
      this.outputUsers.emit(this.selectedUsers);

      this.selectedUser = new User();
      this.message.none();
    }
  }

  remove(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id)
    this.outputUsers.emit(this.selectedUsers);
  }

  private clean(): void{
    this.message.none();
    this.selectedUsers = [];
    this.selectedUser = new User();
  }

  private exist(user: User): boolean{
    let result: User[] = this.selectedUsers.filter(u => u.id === user.id);
    return result.length > 0;
  }
}
