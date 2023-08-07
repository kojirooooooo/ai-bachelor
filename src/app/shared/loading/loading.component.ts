import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('foreTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: '*' }),
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoadingComponent {
  constructor(public loading: LoadingService) {}
}
