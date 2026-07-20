import 'zone.js';

import {
  bootstrapApplication
} from '@angular/platform-browser';

import { AppComponent }
from './app/app.component';

import {
  provideRouter
} from '@angular/router';

import {
  importProvidersFrom
} from '@angular/core';

import { FormsModule }
from '@angular/forms';

import {
  provideAnimations
} from '@angular/platform-browser/animations';

import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';

import { routes }
from './app/app.routes';

bootstrapApplication(
  AppComponent,
  {
    providers: [

      provideRouter(routes),

      importProvidersFrom(
        FormsModule
      ),

      provideAnimations(),

      provideHttpClient(
        withFetch()
      )
    ]
  }
).catch(err =>
  console.error(err)
);