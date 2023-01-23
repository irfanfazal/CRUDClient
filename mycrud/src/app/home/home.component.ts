import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../userServices/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
crud="Crud";
app="App";

constructor(private router:Router,private jwthelper:JwtHelperService,public myservice:UserService) { }
// isUserAuthenticated = ():boolean=>{
// const token = localStorage.getItem("auth");
// if(token && !this.jwthelper.isTokenExpired(token)){
//   return true;
// }
// return false;
// }


logout = ()=>{
  localStorage.removeItem("loginT");
  this.router.navigate(['login'])
}
  ngOnInit(): void {
  
  }


}
