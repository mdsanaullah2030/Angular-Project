import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewlocationComponent } from './location/viewlocation/viewlocation.component';
import { CreatelocationComponent } from './location/createlocation/createlocation.component';
import { UpdatelocationComponent } from './location/updatelocation/updatelocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ViewhotelComponent } from './hotel/viewhotel/viewhotel.component';
import { CreatehotelComponent } from './hotel/createhotel/createhotel.component';
import { UpdatehotelComponent } from './hotel/updatehotel/updatehotel.component';
import { ViewroomComponent } from './room/viewroom/viewroom.component';
import { UpdateroomComponent } from './room/updateroom/updateroom.component';
import { CreateroomComponent } from './room/createroom/createroom.component';
import { ViewbookingComponent } from './booking/viewbooking/viewbooking.component';
import { UpdatebookingComponent } from './booking/updatebooking/updatebooking.component';
import { CreatebookingComponent } from './booking/createbooking/createbooking.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './style/home/home.component';
import { AboutComponent } from './style/about/about.component';
import { LoginComponent } from './singIn/login/login.component';
import { LogoutComponent } from './singIn/logout/logout.component';
import { RegistrationComponent } from './singIn/registration/registration.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';



@NgModule({
  declarations: [
    AppComponent,
    ViewlocationComponent,
    CreatelocationComponent,
    UpdatelocationComponent,
    ViewhotelComponent,
    CreatehotelComponent,
    UpdatehotelComponent,
    ViewroomComponent,
    UpdateroomComponent,
    CreateroomComponent,
    ViewbookingComponent,
    UpdatebookingComponent,
    CreatebookingComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    UserprofileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    
    library.addIconPacks(fas);
  }
}
