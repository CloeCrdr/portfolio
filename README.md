# PortfolioCloe

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start the API locally, run:

```bash
npm run start:api
```

Then, in a second terminal, start the Angular development server:

```bash
npm start
```

The Angular dev server proxies `/api` calls to `http://localhost:3000`, so the frontend and backend can use the same relative API URLs.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Alwaysdata deployment

This repository is prepared for a Node.js deployment that serves both:

- the Airtable-backed API under `/api`
- the Angular build as static files

Important: pushing to GitHub alone is not enough. On alwaysdata you still need to deploy the repository contents, install dependencies, build the frontend, and start the Node.js site.

### Expected runtime setup

1. Create a Node.js site in alwaysdata.
2. Set the working directory to the project root.
3. Use this start command:

```bash
node server/index.js
```

4. Define these environment variables in alwaysdata:

```bash
AIRTABLE_TOKEN=...
AIRTABLE_BASE_ID=...
```

The server is compatible with alwaysdata's `HOST` / `IP` and `PORT` environment variables and will bind to them automatically.

### Typical deployment flow

```bash
npm install
npm run build
```

If you want a local secret template, copy `server/.env.example` to `server/.env` and fill in your Airtable values.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
