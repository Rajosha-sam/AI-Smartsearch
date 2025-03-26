import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserservicesService } from '../../Shared/Services/userservices.service';
import { AssetEnrichCapabilityFilterPipe } from '../../Shared/Pipe/asset-enrich-capability-filter.pipe';


@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [CommonModule, FormsModule,AssetEnrichCapabilityFilterPipe],
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'] 
})
export class AssetComponent implements OnInit {
  users: any 
  searchText: string = '';

  constructor(private userservice: UserservicesService) {}

  ngOnInit(): void {
    this.userservice.getView().subscribe({
      next: (data) => {
        this.users = data; 
      },
      error: () => {
        
      },
      complete: () => {
       
      }
    });
  }
}

