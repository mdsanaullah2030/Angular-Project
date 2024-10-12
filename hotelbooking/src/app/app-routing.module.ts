import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewlocationComponent } from './location/viewlocation/viewlocation.component';
import { CreatelocationComponent } from './location/createlocation/createlocation.component';
import { UpdatelocationComponent } from './location/updatelocation/updatelocation.component';
import { ViewhotelComponent } from './hotel/viewhotel/viewhotel.component';
import { CreatehotelComponent } from './hotel/createhotel/createhotel.component';
import { UpdatehotelComponent } from './hotel/updatehotel/updatehotel.component';
import { ViewroomComponent } from './room/viewroom/viewroom.component';
import { CreateroomComponent } from './room/createroom/createroom.component';
import { UpdateroomComponent } from './room/updateroom/updateroom.component';
import { ViewbookingComponent } from './booking/viewbooking/viewbooking.component';
import { CreatebookingComponent } from './booking/createbooking/createbooking.component';
import { UpdatebookingComponent } from './booking/updatebooking/updatebooking.component';
import { AboutComponent } from './style/about/about.component';
import { HomeComponent } from './style/home/home.component';
import { RegistrationComponent } from './singIn/registration/registration.component';
import { LoginComponent } from './singIn/login/login.component';
import { AuthGuard } from './guard/authguard.guard';
import { LogoutComponent } from './singIn/logout/logout.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { RoleGuard } from './guard/role.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'view', component: ViewlocationComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'User' } },

  { path: 'create', component: CreatelocationComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'updateLocation/:id', component: UpdatelocationComponent, 
    canActivate: [AuthGuard], data: { role: 'Admin' } },

  { path: 'hotelview', component: ViewhotelComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'User' } },

  { path: 'createHotel', component: CreatehotelComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'updateHotel/:id', component: UpdatehotelComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'roomview', component: ViewroomComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'User' } },

  { path: 'roomcreat', component: CreateroomComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'updateRoom/:id', component: UpdateroomComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'booking', component: ViewbookingComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'User' } },

  { path: 'creat', component: CreatebookingComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'User' } },

  { path: 'updateBooking/:id', component: UpdatebookingComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },

  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'userprofile', component: UserprofileComponent, 
    canActivate: [AuthGuard, 
      RoleGuard], data: { role: 'Admin' } },
      
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

