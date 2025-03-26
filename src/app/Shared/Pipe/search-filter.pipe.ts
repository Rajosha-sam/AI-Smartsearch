import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
  
})
export class SearchFilterPipe implements PipeTransform {
  transform(users: any, searchtext: string){
    if (!users || !searchtext) {
      return users; 
    }
    return users.filter((user:any) =>
      user.name.toLowerCase().includes(searchtext.toLowerCase()) || 
      user.email.toLowerCase().includes(searchtext.toLowerCase())
    );
  }
}
