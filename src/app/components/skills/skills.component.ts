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
  skills = {
    developpement: [
      'HTML5', 
      'CSS3', 
      'JavaScript',
      'TypeScript',
      'Angular',
      'React',
      'ExpressJS',
      'Node.js',
      'PHP',
      'Bootstrap', 
      'Tailwind',
      'Python', 
      'Django',
      'MySQL',
      'SCSS', 
      'Git',
      'PrestaShop',
      'WordPress',
      'Java'
    ],
    projets: [
      'Agile',
      'SAFe',
      'Scrum',
      'Jira',
      'Trello',
      'No-Code'
    ],
    marketing: [
      'SEO',
      'Google Analytics',
      'Réseaux Sociaux',
      'Stratégie Digitale',
      'Rédactions techniques',
      'Traduction'
    ],
    qualite: [
      'Automatisation',
      'Accessibilité Web',
      'Jasmine',
      'SonarQube',
      'Notions Cybersécurité & DevOps'
    ],
    design: [
      'Figma',
      'Photoshop',
      'UI/UX Design',
      'Responsive Design'
    ],
    langues: [
      'Français (natif)',
      'Anglais (courant & fluide)',
      'Italien (courant)',
      'Portugais (courant)',
      'Espagnol (notions)'
    ]
  };
}
