import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Usermodel } from 'src/app/model/usermodel';
import { UserService } from 'src/app/userServices/user.service';
import {NgForm} from '@angular/forms'
import {Router} from "@angular/router";
import {  HttpEventType, HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  //We create two public properties
  progress: number;//this one is to show the upload progress
  message: string;//This one is to hold the message when the upload action is finished

  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('myform')myform:NgForm;

  constructor(public userservice: UserService,public router:Router) { }

  //this is angular event which is call after app loading
  ngOnInit(): void {
 
  }
country:string='';

save(data){
this.country = (<HTMLInputElement>document.getElementById("country")).value;
if(this.country=='Pakistan'){
  console.log('got it i am pakistani');
}else{
  console.log('ahhh you are outsider');
}
console.log(this.country);
console.log(data);

  }

submit(form:NgForm){
    
 this.userservice.users.isMarried=form.value.isMarried==true?1:0;
    if(this.userservice.users.id==0){
      this.insertUser(form);
    }else
    this.updateUser(form);
  }


insertUser(myform:NgForm){
    this.userservice.insertData().subscribe(d=>{
      this.resetform(myform);
      this.refereshData();
      console.log('record inserted');
      this.router.navigate(['']);
    
    })
  }

  //In the uploadFile function, we create a formData object and append the file that we want to upload
uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.userservice.http.post('https://localhost:5001/api/uploadImg', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
  //get event response
  response:{dbPath:''};
  uploadFinished=(event)=>{
    this.response = event;
  }
 
  updateUser(iform:NgForm){
    this.userservice.updateData().subscribe(d=>{
      this.resetform(iform);
      this.refereshData();
      console.log("Record updated!!");
      this.router.navigate(['']);
    })
  }


  resetform(iform:NgForm){
  this.myform.form.reset(this.myform.value);
    this.userservice.users=new Usermodel();
  }


  refereshData()
  {
    this.userservice.getAll().subscribe(res=>{
      this.userservice.userslist=res;
    });
  }

  cancel(iform){
    this.resetform(iform);
    this.router.navigate(['']);
  }

  // country:any=[
  //   'Pakistan','USA','India','Turkey','Germany','China'
  // ]

  check(myform:NgForm){
    console.log(myform);
  }
}

//submit(form:NgForm)
//   {
//     this.empService.employeeData.isMarried=form.value.isMarried==true?1:0;
//     this.empService.employeeData.isActive=form.value.isActive==true?1:0;
//     if(this.empService.employeeData.id==0)
//       this.insertEmployee(form);
//      else
//      this.updateEployee(form);
//   }
//   insertEmployee(myform:NgForm)
//   {  this.empService.saveEmployee().subscribe(d=> {
//      this.resetForm(myform);
//      this.refereshData();
//      this.toast.success('Sucess','Record Saved');
//     });
//   }
//   updateEployee(myform:NgForm)
//   {
//     this.empService.updateEmployee().subscribe(d=> {
//       this.resetForm(myform);
//       this.refereshData();
//       this.toast.warning('Sucess','Record Updated');
//     });
//   }
//   resetForm(myform:NgForm)
//   {
//     myform.form.reset(myform.value);
//     this.empService.employeeData=new Epmloyee();
//     this.hideShowSlide();
//   }




