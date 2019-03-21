import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderState: Subject<boolean> = new Subject;

  constructor() {}

  showLoader() {
    this.loaderState.next(true);
  }

  hideLoader() {
    this.loaderState.next(false);
  }
}
