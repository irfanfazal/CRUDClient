import { Component, OnInit } from '@angular/core';
import { Usermodel } from '../model/usermodel';
import { UserService } from '../userServices/user.service';
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'mycrud';

  constructor(public userserv: UserService, public router:Router,public datepipe:DatePipe) {

  }
  ngOnInit(): void {
    this.userserv.getAll().subscribe(data => {
      this.userserv.userslist = data;
    })
  }


  editData(selecetedUser:Usermodel){
    let df=this.datepipe.transform(selecetedUser.djoin,'yyyy-MM-dd');
    selecetedUser.djoin=df;
    console.log(df);
    this.userserv.users=selecetedUser;
    console.log(selecetedUser);
    console.log("Record populated!!");
    this.router.navigate(['add']);

    
  }
  isDeleted:boolean=false;
  deleteRecord(id: number) {
    {
          if(confirm('Are you really want to delete this record?'))
          {this.userserv.deteleData(id).subscribe((data)=> {
            this.userserv.getAll().subscribe(data=>{
              this.userserv.userslist=data;
              this.isDeleted=true;
              console.log(`Record of ${id} deleted!!`);
              
            });
          },
          err=>{
          });
          }
        }
  }
  
  public createImgPath = (serverPath:string)=>{
    console.log(serverPath);
    return `https://localhost:5001/${serverPath}`;
   
  }
}
