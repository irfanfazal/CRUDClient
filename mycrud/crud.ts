// Create Employee Service Class for http operations:

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Designation, Epmloyee } from './epmloyee.model';
// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   constructor(private myhttp:HttpClient) { }
//   employeeUrl:string='https://localhost:44372/api/Employee';
//   designationUrl:string='https://localhost:44372/api/Designation';
//   listEmployee:Epmloyee[]=[]; //For Getting Data EmployeeList
//   listDesignation:Designation[]=[];
//   employeeData:Epmloyee=new Epmloyee(); //for post data / Insert data
//   saveEmployee()
//   {
//     return this.myhttp.post(this.employeeUrl,this.employeeData);
//   }
//   updateEmployee()
//   {
//     return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}` ,this.employeeData);
//   }
//   getEmployees():Observable<Epmloyee[]>
//   {
//     return this.myhttp.get<Epmloyee[]>(this.employeeUrl);
//   }
//   getDesignations():Observable<Designation[]>
//   {
//     return this.myhttp.get<Designation[]>(this.designationUrl);
//   }
//   deleteEmployee(id:number)
//   {
//     return this.myhttp.delete(`${this.employeeUrl}/${id}`);
//   }
//  }

// ----------------------------------------------------------------------
// app.module.ts file:

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HttpClientModule} from '@angular/common/http';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
// import { EmployeeFormComponent } from './employee-details/employee-form/employee-form.component';
// import { FormsModule } from '@angular/forms';
// import{DatePipe} from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
// @NgModule({
//   declarations: [
//     AppComponent,
//     EmployeeDetailsComponent,
//     EmployeeFormComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     FormsModule,
//     BrowserAnimationsModule,
//     ToastrModule.forRoot()
//   ],
//   providers: [DatePipe],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// ---------------------------------------------------------------------------------

// index.html file:

// 	<!doctype html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>Int</title>
//   <base href="/">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <link rel="icon" type="image/x-icon" href="favicon.ico">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
//  </head>
//  <body>
//   <app-root></app-root>
//   <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
//  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
//  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"    crossorigin="anonymous"></script>
//  </body>
//  </html>

// --------------------------------------------------------------------------------------------------------------------------
// employee-details Component.html:

// <div class="container">
// <app-employee-form></app-employee-form>
// </div>
// <table class="table table-hover">
//     <thead class="thead-dark">
//      <tr>
//       <th>Name</th>
//       <th>Last Name</th>
//       <th>Email</th>
//       <th>Date of Join</th>
//       <th>Designation</th>
//       <th>Age</th>
//       <th>Actions</th>
//      </tr>
//     </thead>
//     <tbody>
//       <tr *ngFor="let emp of empService.listEmployee"> 
//         <td>{{emp.name}}</td>
//         <td>{{emp.lastName}}</td>
//         <td>{{emp.email}}</td>
//         <td>{{emp.doj | date:'yyyy-MM-dd' }}</td>
//         <td>{{emp.designation}}</td>
//         <td>{{emp.age}}</td>
//         <td>
//           <div class="dropdown">
//               <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                Actions
//               </button>
//               <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                 <a class="dropdown-item" href="#" (click)="populateEmployee(emp)">Edit</a>
//                 <a class="dropdown-item" href="#" (click)="delete(emp.id)">Delete</a>
                
//               </div>
//             </div>
//         </td>
//       </tr>
//     </tbody>
// </table>
// ----------------------------------------------------------------------------------------------------------
// employee-details.component.ts file:

// import { DatePipe } from '@angular/common';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { EmployeeService } from '../shared/employee.service';
// import { Epmloyee } from '../shared/epmloyee.model';
// import { EmployeeFormComponent } from './employee-form/employee-form.component';
// @Component({
//   selector: 'app-employee-details',
//   templateUrl: './employee-details.component.html',
//   styleUrls: ['./employee-details.component.css']
// })
// export class EmployeeDetailsComponent implements OnInit {
//   constructor(public empService:EmployeeService, public datepipe:DatePipe, public toast:ToastrService) { }
//   @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
//   ngOnInit() {
//     this.empService.getEmployees().subscribe(data=>{
//       this.empService.listEmployee=data;
//     });
//   }
//   populateEmployee(selecetedEmployee:Epmloyee)
//   {
//     let df=this.datepipe.transform(selecetedEmployee.doj,'yyyy-MM-dd');
//     selecetedEmployee.doj=df;
//     this.empService.employeeData=selecetedEmployee;
    
//     if(this.emp.isSlide==='off')
//     {
//      this.emp.hideShowSlide();
//     }
//   }
//   delete(id:number)
//   {
//     if(confirm('Are you really want to delete this record?'))
//     {
//       this.empService.deleteEmployee(id).subscribe(data=> {
//         this.empService.getEmployees().subscribe(data=>{
//           this.empService.listEmployee=data;
//           this.toast.error('Success','Record Deleted');
//         });
//       },
//       err=>{
//       });
//     }
//   }
//  }
// -----------------------------------------------------------------------------------
// employee-form.component.html:

// <input #checkbox1 type="checkbox" name="toggle" id="toggle">
// <label for="toggle"></label>
// <div class="container">
// </div>
// <div class="formAdd">
//     <form autocomplete="off" #myForm="ngForm" (ngSubmit)="myForm.form.valid && submit(myForm)">
//         <div class="container">
//             <div class="row">
//                 <div class="col-md-3">
//                     <input type="hidden" name="id" [value]="empService.employeeData.id">
 
//                     <label for="name" class="float-left">Name</label>
//                     <div *ngIf="name.invalid && (name.touched || name.dirty)" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
//                     <input type="text" name="name" class="form-control" placeholder="Enter Name" #name="ngModel" [(ngModel)]="empService.employeeData.name" required>
//                 </div>
 
//                 <div class="col-md-3">
//                     <label for="name" class="float-left">Last Name</label>
//                     <div *ngIf="lastname.invalid && (lastname.touched || lastname.dirty)" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
//                     <input type="text" name="lastname" class="form-control" placeholder="Enter Last Name" #lastname="ngModel" [(ngModel)]="empService.employeeData.lastName" required>
//                 </div>
 
//                 <div class="col-md-3">
//                     <label for="name" class="float-left">Email</label>
//                     <div *ngIf="email.invalid && (email.touched || email.dirty)" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
//                     <input type="Email" name="email" class="form-control" placeholder="Enter Email" #email="ngModel" [(ngModel)]="empService.employeeData.email" required>
//                 </div>
 
//                 <div class="col-md-3">
//                     <label for="name" class="float-left">Age</label>
//                     <div *ngIf="age.invalid && (age.touched || age.dirty)" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
//                     <input type="number" name="age" class="form-control" placeholder="Enter Age" #age="ngModel" [(ngModel)]="empService.employeeData.age" required>
//                 </div>
//             </div>
 
//             <div class="row">
//                 <div class="col-md-3">
//                     <label for="date" class="label float-left">Date of joining</label>
//                     <div *ngIf="doj.invalid && (doj.touched || doj.dirty)" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
//                     <input type="date" class="form-control" name="doj" [(ngModel)]="empService.employeeData.doj" #doj="ngModel" required>
//                 </div>
 
 
//                 <div class="col-md-3">
//                     <label for="designation" class="label float-left">Designation</label>
//                     <div *ngIf="designationID.touched && designationID.value===0" class="float-right">
//                         <p class="text-danger">Required</p>
//                     </div>
                    
//                     <select name="designationID" class="form-control" #designationID="ngModel" [(ngModel)]="empService.employeeData.designationID" required>
//                         <option value="0">Please Select</option>
//                         <option  *ngFor="let desg of empService.listDesignation" [ngValue]="desg.id">{{ desg.designation }}</option>
//                     </select>
                
//                 </div>
 
//                 <div class="col-md-6">
//                     <label for="gender">Gender</label>
//                     <div class="row">
//                         <div class="col-md-6">
                            
//                             <div class="form-check-inline">
//                                 <label class="form-check-label">
//                                   <input type="radio" checked="true" id="rbtn" class="form-check-input" name="gender" #gender="ngModel" [(ngModel)]="empService.employeeData.gender" value="male">Male
//                                 </label>
//                             </div>
                              
//                               <div class="form-check-inline">
//                                 <label class="form-check-label">
//                                   <input type="radio" id="rbtn" class="form-check-input" name="gender" #gender="ngModel" [(ngModel)]="empService.employeeData.gender" value="female">Female
//                                 </label>
//                               </div>
 
//                               <div class="form-check-inline">
//                                 <label class="form-check-label">
//                                   <input type="radio" id="rbtn" class="form-check-input" name="gender" #gender="ngModel" [(ngModel)]="empService.employeeData.gender" value="others">Others
//                                 </label>
//                               </div>
                              
//                         </div>
 
//                         <div class="col-md-6">
//                             <div class="form-check-inline">
//                                 <label class="form-check-label">
//                                     <input type="checkbox" class="form-check-input" name="isMarried" #isMarried="ngModel" [(ngModel)]="empService.employeeData.isMarried">Married
//                                  </label>
//                             </div>
//                             <div class="form-check-inline">
//                                 <label class="form-check-label">
//                                     <input type="checkbox" class="form-check-input" name="isActive" #isActive="ngModel" [(ngModel)]="empService.employeeData.isActive">Active
//                                  </label>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
 
                
//             </div>
 
//             <div class="row">
//                 <div class="col-md-8"></div>
//                 <div class="col-md-2">
//                     <button type="submit" [disabled]="designationID.value===0" class="btn btn-success btn-block">Save</button>
//                 </div>
//                 <div class="col-md-2">
//                     <button type="reset" class="btn btn-danger btn-block">Cancel</button>
//                 </div>
//             </div>
 
 
//         </div>
//     </form>
//  </div>
// -------------------------------------------------------------------------------------------------------------
// employee-form.component.css:

// .formAdd {
//   background:#c7b29e;
//   color:#FFF;
//   position: absolute;
//   top: -250px;
//   left: 0;
//   width: 100%;
//   height: 250px;
//   padding: 20px;
//   transition: top 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
//   overflow: hidden;
//   box-sizing: border-box;
//   }
//   #toggle {
//     position:absolute;
//     appearance:none;
//     cursor:pointer;
//     left:-100%;
//     top:-100%;
//   }
//   #toggle + label {
//     position:absolute;
//     cursor:pointer;
//     padding:10px;
//     background: #26ae90;
//     width: 100px;
//     border-radius: 3px;
//     padding: 8px 10px;
//     color: #FFF;
//     line-height:20px;
//     font-size:12px;
//     text-align:center;
//     -webkit-font-smoothing: antialiased;
//     cursor: pointer;
//     margin:20px 50px;
//     transition:all 500ms ease;
//     }
//     #toggle + label:after {
//       content:"Add New" 
//     }
//     .container {
//     transition: margin 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
//       padding:2em 3em;
//     }
//     #toggle:checked ~ .formAdd {
//       top: 0;
//     }
//     #toggle:checked ~ .container {
//       margin-top: 250px;
//     }
//     #toggle:checked + label {
//       background:#dd6149;
//     }
//     #toggle:checked + label:after {
//       content:"Close"
//     }
// ------------------------------------------------------------------------------------

// employee-form.component.ts:

// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { EmployeeService } from 'src/app/shared/employee.service';
// import { Epmloyee } from 'src/app/shared/epmloyee.model';
//  @Component({
//   selector: 'app-employee-form',
//   templateUrl: './employee-form.component.html',
//   styleUrls: ['./employee-form.component.css']
//  })
//  export class EmployeeFormComponent implements OnInit {
//   constructor(public empService:EmployeeService, public toast:ToastrService) { }
//   @ViewChild('checkbox1') checkBox:ElementRef;
//   isSlide:string='off';
//   ngOnInit() {
//     this.empService.getDesignations().subscribe(data=> {
//         this.empService.listDesignation=data;
//     });
//   }
//   submit(form:NgForm)
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
//   refereshData()
//   {
//     this.empService.getEmployees().subscribe(res=>{
//       this.empService.listEmployee=res;
//     });
//   }
//   hideShowSlide()
//   {
//     if(this.checkBox.nativeElement.checked)
//     {
//       this.checkBox.nativeElement.checked=false;
//       this.isSlide='off';
//     }
//     else
//     {
//       this.checkBox.nativeElement.checked=true;
//       this.isSlide='on';
//     }
//   }
//  }
// ---------------------------------------------------------------

// app.component.html file:

//  <div class="container">
//   <app-employee-details></app-employee-details>
//   </div>
//   <router-outlet></router-outlet>
