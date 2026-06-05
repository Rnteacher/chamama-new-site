const { parseCSV } = require('./_csv');

exports.handler = async function(event, context) {
  const csvUrl = process.env.NEWSLETTERS_CSV_URL;

  // Verify environment variable is set
  if (!csvUrl) {
    console.error('Environment variable NEWSLETTERS_CSV_URL is missing.');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'שגיאה: הגדרת משתנה הסביבה NEWSLETTERS_CSV_URL חסרה בשרת.',
        details: 'Missing NEWSLETTERS_CSV_URL environment variable on Netlify.'
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
    const newsletters = rawItems.map(item => {
      // Split post_slugs into an array (pipe-separated)
      let slugsList = [];
      if (item.post_slugs) {
        slugsList = item.post_slugs
          .split('|')
          .map(s => s.trim())
          .filter(Boolean);
      }

      return {
        id: item.id || '',
        title: item.title || '',
        date: item.date || '',
        issue: item.issue || '',
        template: (item.template || 'classic').trim().toLowerCase(),
        intro: item.intro || '',
        post_slugs: slugsList,
        published: parseBoolean(item.published)
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60' // Cache for 60 seconds
      },
      body: JSON.stringify(newsletters)
    };

  } catch (error) {
    console.error('Error fetching or processing newsletters CSV:', error);
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
