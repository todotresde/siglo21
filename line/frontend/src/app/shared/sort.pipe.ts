import { Pipe,PipeTransform } from "@angular/core";

import { Commons } from './commons';

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform{
  public transform(array: Array<any>, args: string): Array<any> {
    return Commons.sort(array, args);
  }
}