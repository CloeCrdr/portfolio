import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss', 
  animations: [
    trigger('fadeIn', [
      transition(':enter',[
        style({opacity: 0}),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent {
  @Input() activeSection: string ='';
}
