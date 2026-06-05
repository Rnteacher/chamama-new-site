/**
 * Lightweight, dependency-free CSV parser tailored for Google Sheets CSV exports.
 * 
 * Supports:
 * - Comma separated values
 * - Double-quoted cell values
 * - Commas, carriage returns, and newlines inside quoted values
 * - Escaped double-quotes ("") inside quoted values
 * - Trimming UTF-8 BOM if present
 * - Using first row as header keys
 */
function parseCSV(csvText) {
  if (!csvText) return [];

  // Remove Byte Order Mark (BOM) if present
  if (csvText.startsWith('\uFEFF')) {
    csvText = csvText.substring(1);
  }

  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote: "" becomes a single quote
          currentCell += '"';
          i++; // Skip the second quote
        } else {
          // Closing quote
          insideQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        // Cell boundary
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\r' || char === '\n') {
        // Row boundary
        currentRow.push(currentCell.trim());
        currentCell = '';
        
        // Push only non-empty rows
        if (currentRow.length > 0 && !(currentRow.length === 1 && currentRow[0] === '')) {
          rows.push(currentRow);
        }
        currentRow = [];

        // Handle CRLF line ending by skipping \n if we just hit \r
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentCell += char;
      }
    }
  }

  // Push last cell & row if remaining
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.length > 0 && !(currentRow.length === 1 && currentRow[0] === '')) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) {
    return [];
  }

  // First row holds header keys
  const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim());
  const dataObjects = [];

  for (let r = 1; r < rows.length; r++) {
    const values = rows[r];
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      const header = headers[c];
      const val = values[c] !== undefined ? values[c] : '';
      obj[header] = val;
    }
    dataObjects.push(obj);
  }

  return dataObjects;
}

module.exports = { parseCSV };
