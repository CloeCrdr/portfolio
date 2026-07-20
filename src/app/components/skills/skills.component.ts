import {
  CommonModule
} from '@angular/common';

import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

import { SkillsService }
  from '../../services/skills.service';

@Component({
  selector: 'app-skills',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './skills.component.html',

  styleUrls: [
    './skills.component.scss'
  ],

  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '800ms ease-in',
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})

export class SkillsComponent
  implements OnInit {

  @Input()
  activeSection: string = '';

  stacksByType: any = {};

  businessSkillsByCategory:
    any = {};

  constructor(
    private skillsService:
      SkillsService
  ) { }

  ngOnInit(): void {

    this.skillsService
      .getStacks()
      .subscribe((data) => {

        this.stacksByType =
          this.groupBy(data, 'type');

      });

    this.skillsService
      .getBusinessSkills()
      .subscribe((data) => {

        this.businessSkillsByCategory =
          this.groupBy(
            data,
            'categorie'
          );

      });
  }

  groupBy(
    array: any[],
    key: string
  ) {

    return array.reduce(
      (result, item) => {

        const value = item[key];

        if (!result[value]) {
          result[value] = [];
        }

        result[value].push(item);

        return result;

      }, {}
    );
  }

  objectKeys(obj: any): string[] {

    return Object.keys(obj);
  }
}