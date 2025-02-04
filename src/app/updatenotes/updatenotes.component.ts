import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatenotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatenotes.component.html',
  styleUrl: './updatenotes.component.css'
})
export class UpdatenotesComponent implements OnInit {


  constructor(private readonly notesService:NotesService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}


    noteId: any;
    noteData: any = {}
    errorMessage:string = ''

    ngOnInit(): void {
      this.getNoteById();
    }

  async getNoteById(){
      this.noteId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.noteId || !token){
          this.showError("Note ID or TOken is Required")
          return;
      }

      try {
        let noteDataResponse = await this.notesService.getNoteById(this.noteId, token)
         console.log(noteDataResponse);
        const {title, description} = noteDataResponse;
        this.noteData = {title, description};
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateNotes(){
    const confitm = confirm("Are you sure you wanna update this note")
    if(!confirm) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token not found")
      }
      const res = await this.notesService.updateNotes(this.noteId, this.noteData, token);
      console.log(res)

      if(res){
        this.router.navigate(['/notes'])
      }else{
        this.showError(res.message)
      }

    }catch(error:any){
      this.showError(error.message)
    }

  }


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
