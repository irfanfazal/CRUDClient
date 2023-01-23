import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register, Usermodel } from '../model/usermodel';
import { LoginModel } from '../interfaces/login-model';
import { AuthenticatedResponse } from '../interfaces/authenticated-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'https://localhost:5001/api/users';
  posturl: string = 'https://localhost:5001/api/users/';
  loginUrl: string = 'https://localhost:5001/api/auth/login';
  registerUrl:string="https://localhost:5001/api/auth/register";
  getloginUserUrl:"https://localhost:5001/api/auth/"
  credentials:LoginModel={username:"",password:""};
  registraion:Register=new Register();//post signup credential
  getRegisterdata:Register[]=[];//for getting registered data
  userslist: Usermodel[] = [];//for getting data
  users: Usermodel = new Usermodel(); //for posting/insert data


  constructor(public http: HttpClient) {
    console.log('hello from service');
  }
  //post request for login
postCredentials(){
  return this.http.post<AuthenticatedResponse>(this.loginUrl,this.credentials,{
    headers:new HttpHeaders({ "content-Type":"application/json"})
  });
}
register(){
  return this.http.post(this.registerUrl,this.registraion);
}
//get registered user data
getUseraccount():Observable<Register[]>{
  return this.http.get<Register[]>(`${this.getloginUserUrl}`);
}
  //get method have obervable return type
  getAll(): Observable<Usermodel[]> {
    return this.http.get<Usermodel[]>(this.baseUrl);
  }

  //post have 2 argument 1 is url and 2nd is data
  insertData() {
    // const body=JSON.stringify(this.users);
    // console.log(body)
    return this.http.post(this.baseUrl, this.users);
  }

  //update
  updateData() {

    return this.http.put(`${this.baseUrl}/${this.users.id}`, this.users);
  }

  //detele
  deteleData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
