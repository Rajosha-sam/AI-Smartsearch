import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetEnrichCapabilityFilterPipe } from '../../Shared/Pipe/asset-enrich-capability-filter.pipe';
import { UserservicesService } from '../../Shared/Services/userservices.service';
import { SearchFilterPipe } from '../../Shared/Pipe/search-filter.pipe';


@Component({
  selector: 'app-enrich',
imports: [CommonModule, FormsModule,AssetEnrichCapabilityFilterPipe,SearchFilterPipe],
  templateUrl: './enrich.component.html',
  styleUrl: './enrich.component.css'
})
export class EnrichComponent implements OnInit {
user: any;
searchtext: any;
searchTextDescription: any;
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
