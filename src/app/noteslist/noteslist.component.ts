import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-noteslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noteslist.component.html',
  styleUrl: './noteslist.component.css'
})
export class NoteslistComponent implements OnInit {
  notes: any[] = [];
 errorMessage: string = '';

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private readonly noteService: NotesService,
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

    this.loadNotes();
  }

  async loadNotes() {
    try {
      const token: any = localStorage.getItem('token');

      if (this.isAdmin) {
        const response = await this.noteService.getAllNotes(token);
        console.log('All Notes:', response);
        if (response) {
          this.notes = response;
        } else {
          this.showError('No notes found.');
        }
      } else if (this.isUser) {

        const response1 = await this.noteService.getAllNotesByUser(token);
        console.log('User Notes:', response1);
        if (response1) {
          this.notes = response1;
        } else {
          this.showError('No notes found for the user.');
        }
      } else {
        this.showError('User is not authenticated.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteNotes(noteId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.noteService.deleteNotes(noteId, token);
        this.loadNotes(); // Reload the notes after deletion
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(noteId: string) {
    this.router.navigate(['/updatenotes', noteId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }
}
