import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserservicesService } from '../../Shared/Services/userservices.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


import { NgxPaginationModule } from 'ngx-pagination';

import { AssetEnrichCapabilityFilterPipe } from '../../Shared/Pipe/asset-enrich-capability-filter.pipe';
import { SearchFilterPipe } from '../../Shared/Pipe/search-filter.pipe';


@Component({
  selector: 'app-usermanagement',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule,SearchFilterPipe, AssetEnrichCapabilityFilterPipe , NgxPaginationModule],
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  users: any = [];
  loginform: FormGroup = new FormGroup({});
  isModalOpen: boolean = false;
  userId: any = null;
  searchtext: any;
  selectedRole: any;
  userss: any;
  showUserManagement: boolean = true;
  showActionsPersonaRule: boolean = false;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private userservice: UserservicesService, private fb: FormBuilder, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      place: ['', Validators.required],
      authorizeId: ['', Validators.required]
    });

    this.userservice.getView().subscribe({
      next:(data)=>{
  this.userss=data;
      },
      error:()=>{
  
      },
      complete:()=>{
  
      }
     })
    

    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userservice.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getFilteredUsers() {
    let filteredUsers = this.users;

    if (this.selectedRole === 'All') {
      return filteredUsers;
    }
    switch (this.selectedRole) {
      case 'Admin':
        filteredUsers = this.users.filter((user: any) => user.authorizeId === 'Admin');
        break;
      case 'Privileged User':
        filteredUsers = this.users.filter((user: any) => user.authorizeId === 'Priviledged User');
        break;
      case 'Report Viewer':
        filteredUsers = this.users.filter((user: any) => user.authorizeId === 'Report Viewer');
        break;
    }
    return filteredUsers;
  }

  openModal(userId: any = null): void {
    this.userId = userId;
    this.isModalOpen = true;

    if (userId) {
      this.userservice.getUser(userId).subscribe((data) => {
        this.loginform.patchValue(data);
      });
    } else {
      this.loginform.reset();
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.loginform.invalid) {
      this.toaster.error('Please fill all the details correctly');
      return;
    }
    if (this.userId) {
      this.userservice.updateUser(this.loginform.value, this.userId).subscribe({
        next: () => {
          this.toaster.success('User updated successfully');
          this.closeModal();
          this.fetchUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.userservice.createUser(this.loginform.value).subscribe({
        next: () => {
          this.toaster.success('User created successfully');
          this.closeModal();
          this.fetchUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onDelete(id: any): void {
    this.userservice.deleteUser(id).subscribe({
      next: (data) => {
        this.toaster.success('User deleted successfully');
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  roleset() {
    this.showUserManagement = false;
    this.showActionsPersonaRule = true;
  }

  adminAccess() {
    this.showUserManagement = true;
    this.showActionsPersonaRule = false;
  }
}


