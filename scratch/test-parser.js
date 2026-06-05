const { parseCSV } = require('../netlify/functions/_csv');

const testCSV = '\uFEFFslug,title,tags,published\r\n' +
  'open-evening,"ערב חשיפה ""בכיף"" בקמפוס","הרשמה|אירועים",TRUE\r\n' +
  'another-slug,"פרויקט המשלב מתכת, עץ וזכוכית",מייקרס,FALSE\r\n' +
  'newline-field,"שורה ראשונה\nשורה שנייה",טיוטה,yes';

console.log('--- START CSV PARSER TEST ---');
try {
  const result = parseCSV(testCSV);
  console.log('Parsed items count:', result.length);
  console.log(JSON.stringify(result, null, 2));

  // Assertions
  if (result.length !== 3) throw new Error('Expected 3 items');
  if (result[0].slug !== 'open-evening') throw new Error('Failed to parse slug');
  if (result[0].title !== 'ערב חשיפה "בכיף" בקמפוס') throw new Error('Failed to parse escaped quotes');
  if (result[1].title !== 'פרויקט המשלב מתכת, עץ וזכוכית') throw new Error('Failed to parse comma within quotes');
  if (result[2].title !== 'שורה ראשונה\nשורה שנייה') throw new Error('Failed to parse newline within quotes');
  
  console.log('✅ ALL CSV PARSER LOCAL TESTS PASSED!');
} catch (error) {
  console.error('❌ TEST FAILED:', error.message);
  process.exit(1);
}
