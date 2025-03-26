import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserservicesService } from '../../Shared/Services/userservices.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router,private userservice:UserservicesService,private route:Router,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', ], 
      password: ['', ]  
    });
  }

  onSubmit(): void {
    if (this.loginform.valid) {
      const { email, password } = this.loginform.value;
      this.userservice.getlogin(email, password).subscribe({
        next: (data) => {
          console.log(data);
         sessionStorage.setItem('token',data.token)
         sessionStorage.setItem('authorizeid', data.authorizeId)  // This ensures it's stored as a string

         this.toaster.success('Login successfully');
          this.router.navigateByUrl('/home');
          // this.route.navigateByUrl('/view')
        },
        error: (err) => {
          console.error(err);
          alert('Login failed');
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}  
