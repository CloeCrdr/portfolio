const {
  getBase,
} = require('../vercel/airtable.cjs');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');

    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const base = getBase();

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
      const attachments = record.get('image');

      const images = Array.isArray(attachments)
        ? attachments
            .map((attachment) => attachment.url)
            .filter(Boolean)
        : [];

      return {
        title: record.get('Nom'),
        description: record.get('description'),
        descr_long: record.get('description_longue'),
        image: images[0] || '',
        images,
        stack: Array.isArray(stackIds)
          ? stackIds
              .map((id) => stacksMap[id])
              .filter(Boolean)
          : [],
        lien: record.get('lien'),
        url_github: record.get('url_github'),
      };
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Erreur Airtable projets :', error);

    return res.status(500).json({
      error: error.message,
    });
  }
};
