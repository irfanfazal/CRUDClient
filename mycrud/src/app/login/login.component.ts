import { NgForOf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../userServices/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  constructor(private route: Router, public myservice: UserService) { }

  ngOnInit(): void {
  }
  login = (myform: NgForm) => {
    if (myform.valid) {
      this.myservice.postCredentials().subscribe({
        next: (res) => {
          const token = res.token;
          const refreshToken=res.refreshToken;
          console.log(res);
          localStorage.setItem("loginT", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false;
          this.reset(myform);
          this.route.navigate(['']);
        }, error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
  reset(iform: NgForm) {
    iform.reset(iform);
  }

  fieldType:string="password";
  istxt:boolean=false;
  eyeIcon:string="fa-eye-slash";

  hideShowPass(){
    console.log("start",this.istxt);
    this.istxt=!this.istxt;//create toggling
    console.log("mid",this.istxt);
    this.istxt?this.fieldType="text":this.fieldType="password";
    this.istxt?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    console.log("end",this.istxt);
  }
}
