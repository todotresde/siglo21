import { Pipe,PipeTransform } from "@angular/core";

import { Commons } from './commons';

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform{
  public transform(status: number): string {
    switch (status) {
    	case 0: return "pending";
    	case 1: return "in-progress";
    	case 2: return "finished";
    	default: return "error";
    }
  }
}