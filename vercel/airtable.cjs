const Airtable = require('airtable');

let base = null;

function getBase() {
  if (base) {
    return base;
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    throw new Error(
      'Variables AIRTABLE_TOKEN ou AIRTABLE_BASE_ID manquantes.'
    );
  }

  base = new Airtable({
    apiKey: token,
  }).base(baseId);

  return base;
}

module.exports = {
  getBase,
};
