import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../service/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register(): void {
    this.authenticationService.register(this.user).subscribe({
      next: (data) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err?.status === 409) {
          this.errorMessage = 'Username already exists.';
        } else {
          this.errorMessage = 'Unexpected error occured!';
          console.log(err);
        }
      },
    });
  }
}
