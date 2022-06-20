import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from '../models/models';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id : string;
  user = new Usuario()
  constructor(private userService : UserService, 
              private router : Router) { }

  ngOnInit(): void {
    this.id = this.router.url.split('/', 3)[2];
    this.retrieveUser();
  }
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  retrieveUser() : void {
    this.userService.get(+this.id).subscribe(
      { next: (data) => {
          console.log(data);
          this.user = data; 
        },
        error: (e) => {
            console.error(e);
        }
      }
    );
  }

  deleteUser() : void {
    this.userService.delete(+this.id).subscribe(
      { next: (data) => {
          console.log(data);
          this.goToPage('');
      },
        error: (e) => {
            console.error(e);
          }
      }
    );

    this.goToPage('');
  }

}
