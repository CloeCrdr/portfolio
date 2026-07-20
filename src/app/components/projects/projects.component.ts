import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  style,
  transition,
  animate,
  trigger
} from '@angular/animations';

import { CarouselModule }
from 'ngx-owl-carousel-o';

import { ProjectsService }
from '../../services/projects.service';

@Component({
  selector: 'app-projects',

  standalone: true,

  imports: [
    CommonModule,
    CarouselModule
  ],

  templateUrl:
    './projects.component.html',

  styleUrls: [
    './projects.component.scss'
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

export class ProjectsComponent
implements OnInit {

  @Input()
  activeSection: string = '';

  projects: ProjectViewModel[] = [];

  selectedProject:
    ProjectViewModel | null = null;

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
        items: 2
      },

      1024: {
        items: 3
      }
    },

    navText: ['<', '>']
  };

  constructor(
    private projectsService:
    ProjectsService
  ) {}

  ngOnInit(): void {

    this.projectsService
      .getProjects()
      .subscribe((data) => {

        this.projects = data.map(
          (project) =>
            this.normalizeProject(project)
        );

      });
  }

  openProject(
    project: ProjectViewModel
  ): void {

    this.selectedProject = project;
  }

  closeProject(): void {

    this.selectedProject = null;
  }

  private normalizeProject(
    project: ProjectApiModel
  ): ProjectViewModel {

    const siteUrl = this.getValidUrl(
      project.lien
    );

    const githubUrl = this.getValidUrl(
      project.url_github
    );

    const normalizedProject = {
      title: project.title,
      description: project.description,
      descrLong: project.descr_long,
      image: project.image,
      stack: project.stack,
      lien: project.lien,
      urlGithub: project.url_github
    };

    if (siteUrl) {
      return {
        ...normalizedProject,
        actionUrl: siteUrl,
        actionLabel: 'Voir le site',
        actionDisabled: false
      };
    }

    if (githubUrl) {
      return {
        ...normalizedProject,
        actionUrl: githubUrl,
        actionLabel:
          'Voir le projet github',
        actionDisabled: false
      };
    }

    return {
      ...normalizedProject,
      actionUrl: null,
      actionLabel: 'Voir le site',
      actionDisabled: true
    };
  }

  private getValidUrl(
    value: unknown
  ): string | null {

    if (typeof value !== 'string') {
      return null;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return null;
    }

    try {
      const url = new URL(trimmedValue);

      if (
        url.protocol !== 'http:' &&
        url.protocol !== 'https:'
      ) {
        return null;
      }

      return url.toString();
    } catch {
      return null;
    }
  }
}

interface ProjectApiModel {
  title: string;
  description: string;
  descr_long: string;
  image: string;
  stack: string[];
  lien?: string | null;
  url_github?: string | null;
}

interface ProjectBaseModel {
  title: string;
  description: string;
  descrLong: string;
  image: string;
  stack: string[];
  lien?: string | null;
  urlGithub?: string | null;
}

interface ProjectViewModel
extends ProjectBaseModel {
  actionUrl: string | null;
  actionLabel: string;
  actionDisabled: boolean;
}
