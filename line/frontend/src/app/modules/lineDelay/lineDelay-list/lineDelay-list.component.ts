import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LineDelay } from '../lineDelay';
import { LineDelayService } from '../lineDelay.service';

@Component({
  selector: 'app-lineDelay-list',
  templateUrl: './lineDelay-list.component.html',
  providers:[LineDelayService]
})
export class LineDelayListComponent implements OnInit {
  lineDelays: LineDelay[];

  constructor(private router: Router, private lineDelayService: LineDelayService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.lineDelayService
      .getAll()
      .then(lineDelays => this.lineDelays = lineDelays)
      .catch(error => {});
  }

  create(): void {
    this.router.navigate(['../lineDelay'],{ relativeTo: this.r });
  }

  edit(lineDelay: LineDelay): void {
    this.router.navigate(['../lineDelay', lineDelay.id],{ relativeTo: this.r });
  }

  remove(lineDelay: LineDelay): void {
    this.lineDelayService
      .remove(lineDelay)
      .then(lineDelay => this.lineDelays = this.lineDelays.filter(u => u.id !== lineDelay.id))
      .catch(error => {});
  }

}
