import { Routes } from '@angular/router';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { authGuard } from './guard/auth.guard';
import { Role } from './model/role.enum';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
        data: {roles: [Role.ADMIN, Role.USER]}},
    {path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard],
        data: {roles: [Role.ADMIN]}},
    {path: '404', component: NotFoundComponent},
    {path: '401', component: UnauthorizedComponent},
    {path: '**', component: NotFoundComponent}
];
