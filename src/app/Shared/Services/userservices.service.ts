import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  
   constructor(private http:HttpClient) { }
  url:string="https://localhost:7008/api/User"
    getUsers():Observable<any>{
      return this.http.get(this.url);
    }
    getUser(id:any):Observable<any>{
  return this.http.get(this.url + '/' + id);
    }
    createUser(users:any):Observable<any>{
      return this.http.post(this.url, users);
    }
    updateUser(users: any, id: any): Observable<any> {
      
      return this.http.put(`${this.url}/${id}`, users);  
    }
    deleteUser(id:any):Observable<any>{
      return this.http.delete(this.url + '/' + id);
    }
    getlogin(email: string, password: string): Observable<any> {
      return this.http.get(`${this.url}/${email}/${password}`);
    }
    

apiurl:string=" https://localhost:7008/api/View";
getView():Observable<any>
{
  return this.http.get(this.apiurl);
}

apichaturl:string="https://localhost:7008/api/Chatbox";
getChat(name: string): Observable<any> {
    return this.http.get<any>(`${this.apichaturl}?name=${name}`);
  }



  }
  
  