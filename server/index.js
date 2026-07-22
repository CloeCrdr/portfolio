import Airtable from 'airtable';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDir = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(
  serverDir,
  '../dist/portfolio-cloe/browser',
);

loadLocalEnv(resolve(serverDir, '.env'));

const airtableToken = process.env.AIRTABLE_TOKEN;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;

const app = express();
const base = airtableToken && airtableBaseId
  ? new Airtable({ apiKey: airtableToken }).base(airtableBaseId)
  : null;

app.get('/api/health', (_, res) => {
  res.json({
    ok: true,
    hasAirtableConfig: Boolean(base),
  });
});

app.get('/api/projects', async (_, res) => {
  if (!base) {
    return res.status(500).json({
      error: 'Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID.',
    });
  }

  try {
    const stackRecords = await base('Stacks')
      .select()
      .all();

    const stacksMap = {};

    stackRecords.forEach((stack) => {
      stacksMap[stack.id] = stack.get('nom');
    });

    const records = await base('Projets')
      .select()
      .all();

    const projects = records.map((record) => {
      const stackIds = record.get('stack') || [];
      const imageUrls = getAttachmentUrls(
        record.get('image')
      );

      return {
        title: record.get('Nom'),
        description: record.get('description'),
        descr_long: record.get('description_longue'),
        image: imageUrls[0] || '',
        images: imageUrls,
        stack: stackIds.map((id) => stacksMap[id]),
        lien: record.get('lien'),
        url_github: record.get('url_github'),
      };
    });

    return res.json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get('/api/stacks', async (_, res) => {
  if (!base) {
    return res.status(500).json({
      error: 'Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID.',
    });
  }

  try {
    const records = await base('Stacks')
      .select()
      .all();

    const stacks = records.map((record) => ({
      id: record.id,
      nom: record.get('nom'),
      type: record.get('type'),
      famille: record.get('famille'),
      niveau: record.get('niveau'),
    }));

    return res.json(stacks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get('/api/business-skills', async (_, res) => {
  if (!base) {
    return res.status(500).json({
      error: 'Missing AIRTABLE_TOKEN or AIRTABLE_BASE_ID.',
    });
  }

  try {
    const records = await base('Compétences Métier')
      .select()
      .all();

    const skills = records.map((record) => ({
      id: record.id,
      nom: record.get('nom'),
      categorie: record.get('categorie'),
      famille: record.get('famille'),
      niveau: record.get('niveau'),
    }));

    return res.json(skills);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

app.use('/api', (_, res) => {
  res.status(404).json({
    error: 'Not found',
  });
});

if (existsSync(browserDistFolder)) {
  app.use(express.static(browserDistFolder));

  app.get(/.*/, (_, res) => {
    res.sendFile(resolve(browserDistFolder, 'index.html'));
  });
} else {
  console.warn(
    `Static build not found at ${browserDistFolder}. Run "npm run build" before serving the Angular app from Node.`,
  );
}

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || process.env.IP;

if (host) {
  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

function loadLocalEnv(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const fileContents = readFileSync(filePath, 'utf8');

  fileContents.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      return;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();

    if (!key || process.env[key] !== undefined) {
      return;
    }

    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  });
}

function getAttachmentUrls(fieldValue) {
  if (!Array.isArray(fieldValue)) {
    return [];
  }

  return fieldValue
    .map((file) => file?.url)
    .filter((url) => typeof url === 'string' && url.length > 0);
}
