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

    return res.status(200).json(stacks);
  } catch (error) {
    console.error('Erreur Airtable stacks :', error);

    return res.status(500).json({
      error: error.message,
    });
  }
};
