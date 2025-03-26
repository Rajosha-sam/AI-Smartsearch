import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { UserservicesService } from '../Shared/Services/userservices.service';

@Component({
  selector: 'app-viewform',
  imports: [RouterLink],
  templateUrl: './viewform.component.html',
  styleUrl: './viewform.component.css'
})
export class ViewformComponent implements OnInit {
  users: any;
constructor(private userservice:UserservicesService){}
  ngOnInit(): void {
    this.userservice.getUsers().subscribe({
      next:(data)=>{
this.users=data;
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
  }
onDelete(id:any){
  this.userservice.deleteUser(id).subscribe({
    next:(data)=>{
alert("deleted successfully")
this.ngOnInit()
    },
    error:()=>{

    },
    complete:()=>{

    }
  })
}
}
