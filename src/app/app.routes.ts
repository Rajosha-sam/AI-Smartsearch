import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './Modules/layout/layout.component';
import { AssetComponent } from './Modules/asset/asset.component';
import { EnrichComponent } from './Modules/enrich/enrich.component';
import { CapacityComponent } from './Modules/capacity/capacity.component';
import { ReportsComponent } from './pages/reports/reports.component';

import { ViewformComponent } from './viewform/viewform.component';
import { UsermanagementComponent } from './Modules/usermanagement/usermanagement.component';
import { ChatboxComponent } from './chatbox/chatbox.component';


export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'',component:LayoutComponent,children:[
        {path:'home',component:HomeComponent},
        {path:'asset',component:AssetComponent},
        {path:'enrich',component:EnrichComponent},
        {path:'capacity',component:CapacityComponent},
        {path:'reports',component:ReportsComponent},
        {path:'usermanagement',component:UsermanagementComponent}
    ]},
 
    {path:'view',component:ViewformComponent},
    {path:'chatbox',component:ChatboxComponent},
 
    {path:'logout',component:LoginComponent}
];

