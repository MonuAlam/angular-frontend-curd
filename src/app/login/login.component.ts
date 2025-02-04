import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {
    console.log('Submitting login form...');
    
    if (!this.email || !this.password) {
      this.showError("Email and Password are required");
      return;
    }
  
    try {
      console.log('Making login request...');  
      const response = await this.usersService.login(this.email, this.password);
      console.log('Login response:', response);  
  
      if (response.success=true) {
        console.log('Token:', response.jwtToken);
        console.log('Role:', response.roles[0].name);
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('role', response.roles[0].name);
        console.log('Navigating to /profile');
        this.router.navigate(['/profile']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      console.error('Login failed:', error); 
      this.showError(error.message);
    }
  }
  

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
