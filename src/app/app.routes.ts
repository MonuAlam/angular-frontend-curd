import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserslistComponent } from './userslist/userslist.component';
import { usersGuard, adminGuard } from './users.guard';
import { NoteslistComponent } from './noteslist/noteslist.component';
import { UpdatenotesComponent } from './updatenotes/updatenotes.component';
import { CreatenotesComponent } from './createnotes/createnotes.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'createnotes', component: CreatenotesComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
    {path: 'notes', component: NoteslistComponent},
    {path: 'update/:id', component: UpdateuserComponent, canActivate: [usersGuard]},
    {path: 'updatenotes/:id', component: UpdatenotesComponent},
    {path: 'user', component: UserslistComponent, canActivate:[adminGuard]},
    {path: '**', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];
