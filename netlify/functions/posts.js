const { parseCSV } = require('./_csv');

exports.handler = async function(event, context) {
  const csvUrl = process.env.POSTS_CSV_URL;

  // Verify environment variable is set
  if (!csvUrl) {
    console.error('Environment variable POSTS_CSV_URL is missing.');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'שגיאה: הגדרת משתנה הסביבה POSTS_CSV_URL חסרה בשרת.',
        details: 'Missing POSTS_CSV_URL environment variable on Netlify.'
      })
    };
  }

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const rawItems = parseCSV(csvText);

    // Map and normalize each row to match the data structure
    const posts = rawItems.map(item => {
      // Tags normalization (pipe-separated list, e.g. "הרשמה|אירועים")
      let tagsList = [];
      if (item.tags) {
        tagsList = item.tags
          .split('|')
          .map(t => t.trim())
          .filter(Boolean);
      }

      return {
        slug: item.slug || '',
        title: item.title || '',
        date: item.date || '',
        type: item.type || '',
        excerpt: item.excerpt || '',
        body: item.body || '',
        image: item.image || '',
        tags: tagsList,
        published: parseBoolean(item.published),
        newsletter: parseBoolean(item.newsletter)
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60' // Cache for 60 seconds
      },
      body: JSON.stringify(posts)
    };

  } catch (error) {
    console.error('Error fetching or processing posts CSV:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'שגיאה בעיבוד או טעינת הנתונים מגוגל שיטס.',
        details: error.message
      })
    };
  }
};

/**
 * Helper to normalize string representations of boolean fields.
 */
function parseBoolean(val) {
  if (!val) return false;
  const normalized = String(val).trim().toLowerCase();
  return (
    normalized === 'true' ||
    normalized === 'yes' ||
    normalized === '1' ||
    normalized === 'כן' ||
    normalized === 'y' ||
    normalized === 'active' ||
    normalized === 'פעיל'
  );
}
