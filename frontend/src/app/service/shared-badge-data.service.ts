import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedBadgeDataService {
  send_data = new Subject<any>();
  // sendFirstBadge = new Subject<any>();
  constructor() { }
}
