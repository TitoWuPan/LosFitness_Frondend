import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  id = 4;
  user = new Usuario()
  constructor(private UserProfileService : UserProfileService,
    private toastr: ToastrService,
    private router : Router ) { }

  ngOnInit(): void { this.User();}

  User() : void {
    this.UserProfileService.getUsuario(this.id).subscribe(
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

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  deleteUser() : void {
    this.UserProfileService.deleteUsuario(+this.id).subscribe(
      { next: (data) => {
        this.toastr.error(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta eliminada'
        );
          console.log(data);
      },
        error: (e) => {
            console.error(e);
          }
      }
    );

    this.goToPage('');
  }

}
