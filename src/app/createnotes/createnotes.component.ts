import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createnotes',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './createnotes.component.html',
  styleUrl: './createnotes.component.css'
})
export class CreatenotesComponent implements OnInit{

   formData: any = {
      title: '',
      description: ''
    };
    errorMessage: string = '';
    
    constructor(
      private readonly noteService: NotesService,
      private readonly router: Router
    ) { }
    
    ngOnInit(): void {
  
    }
    async handleSubmit() {
  
  
      if (!this.formData.title || !this.formData.description ) {
        this.showError('Please fill in all fields.');
        return;
      }
  
  
      const confirmRegistration = confirm('Are you sure you want to add this note?');
      if (!confirmRegistration) {
        return;
      }
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await this.noteService.createNote(this.formData, token);
        if (response) {
          this.router.navigate(['/notes']);
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
  
  
