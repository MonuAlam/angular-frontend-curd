import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private BASE_URL = "http://localhost:8082";

  constructor(private http: HttpClient) { }


  

  async getAllNotes(token: string): Promise<any> {
    const url = `${this.BASE_URL}/notes/getall`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Token:(getheader)', token); 
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getAllNotesByUser(token: string): Promise<any> {
    const url = `${this.BASE_URL}/notes/user`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Token:(getheader)', token); 
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async createNote(noteData:any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/notes`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, noteData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }



  async getNoteById(noteId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/notes/${noteId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteNotes(noteId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/notes/${noteId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateNotes(noteId: string, noteData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/notes/${noteId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, noteData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  
  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      console.log('Token isAuthenticated() guard:', localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      console.log('Role isAdmin() guard:', role);
      return role === 'ADMIN'
    }
    return false;

  }

  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'USER'
    }
    return false;

  }


}
