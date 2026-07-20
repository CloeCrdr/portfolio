import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class SkillsService {

  private readonly API_URL =
    '/api';

  constructor(
    private http: HttpClient
  ) {}

  getStacks() {

    return this.http.get<any[]>(
      `${this.API_URL}/stacks`
    );
  }

  getBusinessSkills() {

    return this.http.get<any[]>(
      `${this.API_URL}/business-skills`
    );
  }
}
