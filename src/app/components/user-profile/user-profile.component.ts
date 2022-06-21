import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
   
  id!: string;
  id2?:number;
   users?: Usuario[];
   user = new Usuario();
    form: FormGroup | undefined;
  constructor(private userService:UserService ,
    private router : Router,
    private fb: FormBuilder,private toastr: ToastrService) { 
    this.form = this.fb.group({
     description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.router.url;
    this.retrieveUser();
  }
  onDatatable():void{
    this.userService.getAllGenres().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e),
    });
  }
  retrieveUser() : void {
    this.userService.get(this.id).subscribe(
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
}
