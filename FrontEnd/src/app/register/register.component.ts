import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Restaurant } from '../Restaurant';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string |any;
  password: string |any;
  role: string |any;
  restaurants:Restaurant[];

  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  constructor(private http: HttpClient,private authService: AuthService, private router:Router) { }

  register() {
    const user = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.http.post('http://localhost:3000/register', user)
      .subscribe(
        (response:any) => {
          console.log(response);
          // alert('Registration Successful!');
          const style = document.createElement('style');
style.innerHTML = `
  .background-pink{
    background-color: #A47E3B !important; /* Baby pink color */
  }
`;

document.head.appendChild(style);
        Swal.fire({
          title: '<span style="color:whitesmoke;">Thank You!</span>',
  html: '<span style="color:whitesmoke;">Registration Successfull</span>',
  icon: 'success',
  confirmButtonColor: '#61481C',
  customClass:
  {
    popup:'background-pink'
  },
        }),
          this.router.navigate(['/login']);

          // Handle success message or redirect to login page
        },
        error => {
          console.error(error);
          // alert('Registration Failed!');
          const style = document.createElement('style');
style.innerHTML = `
  .background-pink{
    background-color: #A47E3B !important; /* Baby pink color */
  }
`;

document.head.appendChild(style);
        Swal.fire({
          title: '<span style="color:whitesmoke;">Oops!</span>',
  html: '<span style="color:whitesmoke;">Registration Failed</span>',
  icon: 'error',
  confirmButtonColor: '#61481C',
  customClass:
  {
    popup:'background-pink'
  },
        })
          // Handle error message
        }
      );
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
