import { Injectable } from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  private readonly API_URL =
    '/api/projects';

  constructor(private http: HttpClient) {}

  getProjects() {

    return this.http.get<any[]>(
      this.API_URL
    );
  }
}
