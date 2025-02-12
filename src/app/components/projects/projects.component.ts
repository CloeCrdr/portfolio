import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, transition, animate, trigger } from '@angular/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',[
        style({opacity: 0}),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectsComponent {
  @Input() activeSection: string ='';
  projects = [
    { 
      title: 'Portfolio Angular', 
      description: 'Un portfolio interactif et responsive.', 
      image: 'assets/images/project1.gif',
      link: '#' },
    { 
      title: 'Application To-Do', 
      description: 'Une appli pour gérer ses tâches avec style.', 
      image: 'assets/images/project2.gif',
      link: '#' 
    },
    { 
      title: 'Blog Tech', 
      description: 'Un blog pour partager mes découvertes en développement.', 
      image: 'assets/images/project3.gif',
      link: '#' 
    },
    { 
      title: 'E-commerce', 
      description: 'Un site de vente en ligne moderne.', 
      image: 'assets/images/project4.jpg',
      link: '#' 
    }
  ];

  customOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoWidth: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items : 2
      }, 
      1024: {
        items: 3
      }
    },
    navText : ['<', '>']
  }
}
