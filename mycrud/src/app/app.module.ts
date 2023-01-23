import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {UserService} from './userServices/user.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AdduserComponent } from './adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component'
import {FormsModule} from '@angular/forms'
import { DatePipe } from '@angular/common';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component'
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export function tokenGetter(){
  return localStorage.getItem("loginT")
}
@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    DashboardComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config:{
      tokenGetter:tokenGetter,
        allowedDomains:["localhost:5001"],
        disallowedRoutes:[]
      }
    })
    
    
   
  ],
  providers: [UserService,DatePipe,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
