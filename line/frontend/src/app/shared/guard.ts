// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor() {}

  canActivate() {
    return true;
  }
}