import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetEnrichCapabilityFilter',
  standalone: true 
})
export class AssetEnrichCapabilityFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item: any) =>
      item.name?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) ||
      item.status?.toLowerCase().includes(searchText) ||
      item.capability?.toLowerCase().includes(searchText) ||
      item.portfolio?.toLowerCase().includes(searchText)
    );
  }
}


