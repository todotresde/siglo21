import { Pipe } from "@angular/core";

import { Commons } from './commons';

@Pipe({
  name: "sort"
})
export class SortPipe {
  public static transform(array: Array<any>, args: string): Array<any> {
    return Commons.sort(array, args);
  }
}