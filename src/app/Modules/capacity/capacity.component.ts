import { Component, OnInit } from '@angular/core';
import { UserservicesService } from '../../Shared/Services/userservices.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssetEnrichCapabilityFilterPipe } from '../../Shared/Pipe/asset-enrich-capability-filter.pipe';



@Component({
  selector: 'app-capacity',
  imports: [CommonModule, FormsModule,AssetEnrichCapabilityFilterPipe],
  templateUrl: './capacity.component.html',
  styleUrl: './capacity.component.css'
})
export class CapacityComponent implements OnInit {
user: any;
searchTextCapability: any;
searchText: any;
// searchtext: any;
constructor(private userservice:UserservicesService){}
  ngOnInit(): void {
   this.userservice.getView().subscribe({
    next:(data)=>{
this.user=data;
    },
    error:()=>{

    },
    complete:()=>{

    }
   })
  }

}
