import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../userServices/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidregister:boolean;

  constructor(public myservice:UserService, public route:Router) { }
 
  ngOnInit(): void {
  }
  confirmpas:string="helo";
  pass:string;

  signup(myform){

    console.log(this.invalidregister);
    this.confirmpas=myform.value;
    console.log(this.confirmpas);
    this.myservice.register().subscribe(data=>{
      this.invalidregister=false
      this.reset(myform);
      console.log(data);
      this.route.navigate(["login"]);
      
    })
  }
  reset(iform:NgForm){
    iform.reset(iform);
      }

}
