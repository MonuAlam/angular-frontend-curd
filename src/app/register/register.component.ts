import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: '',
    phone: ''
  };
  errorMessage: string = '';
  
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;


  ngOnInit(): void {
      this.isAuthenticated = this.userService.isAuthenticated();
      this.isAdmin = this.userService.isAdmin();
      this.isUser = this.userService.isUser();
  }

  async handleSubmit() {

//|| !this.formData.role

    if (!this.formData.name || !this.formData.email || !this.formData.password  || !this.formData.phone) {
      this.showError('Please fill in all fields.');
      return;
    }


    const confirmRegistration = confirm('Are you sure you want to register this user?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if(!this.isAuthenticated){
        const response = await this.userService.registerNewUser(this.formData);
        this.router.navigate(['/login']);

      }
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.register(this.formData, token);
      if (response) {
        this.router.navigate(['/user']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }
}

