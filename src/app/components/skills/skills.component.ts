import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SkillsComponent {
  @Input() activeSection: string = '';
  skills = [
    'Angular', 
    'TypeScript',
    'SCSS', 
    'HTML5', 
    'CSS3', 
    'JavaScript', 
    'Node.js', 
    'No-Code', 
    'React', 
    'Java', 
    'Git',
    'Responsive Design',
    'Notions cybersécurité et DevOps'
  ];
}
