module.exports = async function handler(req, res) {
  const configured = Boolean(
    process.env.AIRTABLE_TOKEN &&
    process.env.AIRTABLE_BASE_ID
  );

  return res.status(configured ? 200 : 500).json({
    ok: configured,
    hasAirtableConfig: configured,
  });
};
