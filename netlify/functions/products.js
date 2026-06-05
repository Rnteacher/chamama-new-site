const { parseCSV } = require('./_csv');

exports.handler = async function(event, context) {
  const csvUrl = process.env.PRODUCTS_CSV_URL;

  // Verify environment variable is set
  if (!csvUrl) {
    console.error('Environment variable PRODUCTS_CSV_URL is missing.');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'שגיאה: הגדרת משתנה הסביבה PRODUCTS_CSV_URL חסרה בשרת.',
        details: 'Missing PRODUCTS_CSV_URL environment variable on Netlify.'
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
    const products = rawItems.map(item => {
      // Normalize price
      let cleanPrice = 0;
      if (item.price) {
        // Strip non-numeric characters except dots or commas (for currency compatibility)
        const priceStr = String(item.price).replace(/[^\d.]/g, '');
        cleanPrice = parseFloat(priceStr) || 0;
      }

      return {
        id: item.id || '',
        title: item.title || '',
        creator: item.creator || '',
        category: item.category || '',
        price: cleanPrice,
        currency: item.currency || '₪',
        description: item.description || '',
        image: item.image || '',
        status: (item.status || 'available').trim().toLowerCase(),
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
      body: JSON.stringify(products)
    };

  } catch (error) {
    console.error('Error fetching or processing products CSV:', error);
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
