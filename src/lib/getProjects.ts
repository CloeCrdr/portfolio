import base from './airtable';

export async function getProjects() {
  const records = await base('Projets')
    .select({
      sort: [{ field: 'ordre', direction: 'asc' }],
    })
    .all();

  return records.map((record) => {
    const coverField = record.get('image_cover');
    const ghostField = record.get('ghost_image');
    const galleryField = record.get('galerie');

    return {
      id: record.id,

      title: record.get('titre'),

      slug: record.get('slug'),

      description: record.get('description'),

      technologies: record.get('technologies') || [],

      category: record.get('categorie'),

      featured: record.get('featured'),

      url_site: record.get('url_site'),

      url_github: record.get('url_github'),

      cover:
        Array.isArray(coverField) && coverField.length > 0
          ? coverField[0].url
          : null,

      ghost:
        Array.isArray(ghostField) && ghostField.length > 0
          ? ghostField[0].url
          : null,

      gallery:
        Array.isArray(galleryField)
          ? galleryField.map((img) => img.url)
          : [],
    };
  });
}