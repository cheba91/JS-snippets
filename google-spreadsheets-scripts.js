/*
Any embeds need to to be wrapped in a <div data-rt-embed-type="true"></div>
*/

/*
//----------- Fix Invalid HTML -----------//
*/
function fixInvalidHTML() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the values from the column (e.g., column N)
  var range = sheet.getRange('N:N'); // Adjust as needed
  var values = range.getValues();

  // Process each cell to fix the HTML
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (typeof cellValue === 'string') {
      // Replace "" with " only inside attribute values
      var fixedHTML = cellValue.replace(/(\w+)=""([^"]*)""/g, '$1="$2"');
      values[i][0] = fixedHTML;
    }
  }

  // Set the modified values back to the column
  range.setValues(values);
}

/*
//----------- Sanitize HTML -----------//
*/
function sanitizeHTML() {
  // Load the spreadsheet and the active sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all the data in column C
  const range = sheet.getRange(1, 3, sheet.getLastRow(), 1);
  const columnData = range.getValues();

  // Function to sanitize HTML content
  function sanitizeHTML(html) {
    if (!html) return ''; // Return empty if the content is null or empty

    // Use a temporary HTML document to parse and sanitize
    const htmlOutput = HtmlService.createHtmlOutput(html).getContent();

    // Define allowed tags (modify as necessary)
    const allowedTags = [
      'a', 'b', 'strong', 'i', 'em', 'p', 'ul', 'ol', 'li', 'blockquote', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'
    ];

    // Regex to match HTML tags
    const tagRegex = /<\/?(\w+)([^>]*)>/g;

    // Sanitize the content by keeping only allowed tags
    return htmlOutput.replace(tagRegex, (match, tagName) => {
      return allowedTags.includes(tagName.toLowerCase()) ? match : '';
    });
  }

  // Process each cell in the column
  const sanitizedData = columnData.map(row => [sanitizeHTML(row[0])]);

  // Write the sanitized data back to column C
  range.setValues(sanitizedData);
}

/*
//----------- Replace asset links -----------//
*/
function replaceAssetLinks() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the values from the column (e.g., column N)
  var range = sheet.getRange('N:N'); // Adjust as needed
  var values = range.getValues();

  // Process each cell to replace "/assets/ with "mydomain.com/assets/
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (typeof cellValue === 'string') {
      // Replace "/assets/ with "mydomain.com/assets/
      var replacedValue = cellValue.replace(/"\/assets\//g, '"mydomain.com/assets/');
      values[i][0] = replacedValue;
    }
  }

  // Set the modified values back to the column
  range.setValues(values);
}

/*
//----------- Keep only the first value -----------//
*/
function keepFirstValue() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the values from the column (e.g., column A)
  var range = sheet.getRange('A1:A'); // Adjust as needed
  var values = range.getValues();

  // Process each cell to keep only the first semicolon-separated value
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (typeof cellValue === 'string' && cellValue.includes(';')) {
      values[i][0] = cellValue.split(';')[0];
    }
  }

  // Set the modified values back to the column
  range.setValues(values);
}

/*
//----------- Search and replace -----------//
*/
function searchAndReplace() {
  // Get the active spreadsheet and the sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Specify the range of the column you want to modify (e.g., column A)
  var range = sheet.getRange('A1:A'); // Adjust as needed
  var values = range.getValues();

  // Loop through each cell in the column
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i][0] === 'string') {
      // Replace commas with semicolons for string values
      values[i][0] = values[i][0].replace(/,/g, ';');
    }
  }

  // Set the modified values back to the column
  range.setValues(values);
}

/*
//----------- Match two columns in different sheets and add a new column with matched values -----------//
*/
function matchAndAddColumn() {
  // Open the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the sheets by name
  var sheet1 = spreadsheet.getSheetByName('new');
  var sheet2 = spreadsheet.getSheetByName('raw');

  // Get the data from the relevant columns
  var data1 = sheet1.getRange('A:A').getValues();
  var data2 = sheet2.getRange('B:B').getValues();
  var data3 = sheet2.getRange('A:A').getValues();

  // Create an array to store the matched results
  var results = [];

  // Iterate through data1 and match with data2
  for (var i = 0; i < data1.length; i++) {
    var value1 = data1[i][0];
    if (value1) {
      // Check if value is not empty
      var matchFound = false;
      var matchedValue = ''; // Variable to store the matched value from data3
      for (var j = 0; j < data2.length; j++) {
        var value2 = data2[j][0];
        if (value1 == value2) {
          matchFound = true;
          matchedValue = data3[j][0]; // Store the corresponding value from data3
          break; // Exit inner loop once a match is found
        }
      }
      if (matchFound) {
        results.push([matchedValue]); // Add the matched value from data3 to results
      } else {
        results.push(['']); // No match found, add an empty value
      }
    } else {
      results.push(['']); // Empty value in data1, add an empty value
    }
  }

  // Determine the column index for the new column in Sheet1
  var lastColumn = sheet1.getLastColumn();
  var newColumnIndex = lastColumn + 1;

  // Write the results to the new column in Sheet1
  if (results.length > 0) {
    sheet1.getRange(1, newColumnIndex, results.length, 1).setValues(results);
  } else {
    sheet1.getRange(1, newColumnIndex).setValue('No matches found');
  }

  // Set the header for the new column
  sheet1.getRange(1, newColumnIndex).setValue('Matched Values');
}

/*
//----------- Change URL to slug and add it to a new column -----------//
*/
function urlToSlug() {
  // Get the active spreadsheet and the sheets
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the values from the column (e.g., column A)
  var range = sheet.getRange('AF1:AF'); // Adjust as needed
  var values = range.getValues();

  var results = [];

  // Process each cell to replace the URL with the slug
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    Logger.log(cellValue);
    if (typeof cellValue === 'string') {
      // Convert the URL to a slug
      var slug = cellValue
        .split('/')
        .filter(function (part) {
          return part !== '';
        })
        .pop();
      if (slug) {
        results.push([slug]);
      } else {
        results.push(['']);
      }
    }
  }

  var lastColumn = sheet.getLastColumn();
  var newColumnIndex = lastColumn + 1;

  // Write the new column with the slugs
  var newRange = sheet.getRange(1, newColumnIndex, results.length, 1);
  newRange.setValues(results);

  sheet.getRange(1, newColumnIndex).setValue('Original slug');
}

/*
//----------- Comare fields from two columns in a collection and add a new column with matched values, either true or false -----------//
*/
function compareCols() {
  // Get the active spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var data1 = sheet.getRange('B1:B').getValues();
  var data2 = sheet.getRange('AG1:AG').getValues();

  var results = [];

  for (var i = 0; i < data1.length; i++) {
    var value1 = data1[i][0];
    if (value1) {
      var matchFound = false;
      for (var j = 0; j < data2.length; j++) {
        var value2 = data2[j][0];
        if (value1 == value2) {
          matchFound = true;
          break;
        }
      }
      if (matchFound) {
        results.push(['TRUE']);
      } else {
        results.push(['FALSE']);
      }
    } else {
      results.push(['']);
    }
  }
  var lastColumn = sheet.getLastColumn();
  var newColumnIndex = lastColumn + 1;

  if (results.length > 0) {
    sheet.getRange(1, newColumnIndex, results.length, 1).setValues(results);
  } else {
    sheet.getRange(1, newColumnIndex).setValue('No matches found');
  }

  sheet.getRange(1, newColumnIndex).setValue('Matched slugs');
}

/*
//----------- Calculate read time and add it to a new column -----------//
*/
function calculateReadTime() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the data from column B
  var data = sheet.getRange('B:B').getValues();

  // Create an array to store the read times
  var readTimes = [];

  // Iterate through data to strip HTML tags and calculate read time
  for (var i = 0; i < data.length; i++) {
    var htmlContent = data[i][0];
    if (htmlContent) {
      // Strip HTML tags
      var plainText = stripHtml(htmlContent);
      // Calculate word count
      var wordCount = plainText.split(/\s+/).filter(function (word) {
        return word.length > 0;
      }).length;
      // Calculate read time (average reading speed is 200 words per minute)
      var readTime = Math.ceil(wordCount / 200); // in minutes
      readTimes.push([readTime]); // Add the read time to results
    } else {
      readTimes.push(['']); // No content, add an empty value
    }
  }

  // Determine the column index for the new column in the sheet
  var lastColumn = sheet.getLastColumn();
  var newColumnIndex = lastColumn + 1;

  // Write the read times to the new column in the sheet
  if (readTimes.length > 0) {
    sheet.getRange(1, newColumnIndex, readTimes.length, 1).setValues(readTimes);
  } else {
    sheet.getRange(1, newColumnIndex).setValue('No content');
  }

  // Set the header for the new column
  sheet.getRange(1, newColumnIndex).setValue('Read Time');
}

// Function to strip HTML tags
function stripHtml(html) {
  var tmp = HtmlService.createHtmlOutput(html);
  return tmp
    .getContent()
    .replace(/<[^>]*>/g, '')
    .trim();
}

/*
//----------- Remove "new lines" from a column -----------//
*/
function removeNewLinesFromColumnC() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all data from column C
  const columnCData = sheet.getRange(1, 3, sheet.getLastRow()).getValues();

  // Process each cell to remove new lines
  const cleanedData = columnCData.map(row => [row[0].replace(/\r?\n/g, " ")]);

  // Write the cleaned data back to column C
  sheet.getRange(1, 3, cleanedData.length).setValues(cleanedData);

  // Log the completion
  Logger.log("New lines removed from column C.");
}

/*
//----------- Split sheet into multiple sheets by rows -----------//
*/
function splitSheetByRows() {
  // Get the active spreadsheet and the active sheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = spreadsheet.getActiveSheet();

  // Get all the data from the source sheet
  const data = sourceSheet.getDataRange().getValues();
  const header = data[0]; // The header row
  const rows = data.slice(1); // All rows except the header

  // Number of rows per new sheet (excluding the header)
  const rowsPerSheet = 300;

  // Calculate how many sheets are needed
  const numSheets = Math.ceil(rows.length / rowsPerSheet);

  for (let i = 0; i < numSheets; i++) {
    // Create a new sheet
    const newSheet = spreadsheet.insertSheet(`Part ${i + 1}`);

    // Add the header row to the new sheet
    newSheet.appendRow(header);

    // Add the appropriate rows for this sheet
    const startRow = i * rowsPerSheet;
    const endRow = Math.min(startRow + rowsPerSheet, rows.length);
    const rowsForSheet = rows.slice(startRow, endRow);

    // Append rows to the new sheet
    newSheet.getRange(2, 1, rowsForSheet.length, rowsForSheet[0].length).setValues(rowsForSheet);
  }

  SpreadsheetApp.flush();

}
/*
//----------- Replace WordPress tables for Webflow tables -----------//
*/
function replaceWPtablesWithWF() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const column = 3; // Column C (1-based index)
  const range = sheet.getRange(1, column, sheet.getLastRow()); // Get all data in column C
  const values = range.getValues(); // Get values as a 2D array

  // Iterate through each row in column C
  const updatedValues = values.map((row) => {
    if (row[0]) {
      // Check if the cell is not empty
      let cellValue = row[0];
      const stack = []; // Stack to track replaced tags
      let result = ''; // Resultant string
      let index = 0;

      // Modified regex to match figure tags containing table elements
      const regex = /<figure[^>]*>\s*<table|<\/figure>/g;
      let match;

      while ((match = regex.exec(cellValue)) !== null) {
        const tag = match[0];

        if (tag.startsWith('<figure')) {
          // Replace the opening tag and push its index onto the stack
          stack.push(index);
          result += cellValue.substring(index, match.index) + "<div data-rt-embed-type='true'>";
          // Adjust the index to include the table tag
          index = match.index + tag.length - '<table'.length;
        } else if (tag === '</figure>' && stack.length > 0) {
          // Replace the closing tag only if it corresponds to a replaced opening tag
          stack.pop();
          result += cellValue.substring(index, match.index) + '</div>';
          index = regex.lastIndex;
        } else {
          // Add the closing tag unchanged if it's not part of a replaced pair
          result += cellValue.substring(index, match.index) + tag;
          index = regex.lastIndex;
        }
      }

      // Append any remaining content in the cell after the last match
      result += cellValue.substring(index);

      return [result]; // Return the updated cell value
    }

    return row; // Return the original row if empty
  });

  // Update the column with modified values
  range.setValues(updatedValues);
}
/*
//----------- Replace Youtube videos -----------//
*/
function replaceYouTubeEmbeds() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const column = 3; // Column C (1-based index)
  const range = sheet.getRange(1, column, sheet.getLastRow()); // Get all data in column C
  const values = range.getValues(); // Get values as a 2D array

  // Regex to capture the entire YouTube embed, including wrapping <p> tags
  const youtubeRegex = /<p>\s*<iframe[^>]*?src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)[^>]*?title="([^"]+)"[^>]*?><\/iframe>\s*<\/p>/;

  let cellsUpdated = 0;

  const updatedValues = values.map((row, rowIndex) => {
    if (row[0]) {
      // Check if the cell is not empty
      let cellValue = row[0];
      const match = cellValue.match(youtubeRegex);

      if (match) {
        const videoId = match[1]; // Extract the video ID
        const title = match[2]; // Extract the video title

        Logger.log(`Matched Row ${rowIndex + 1}: Video ID = ${videoId}, Title = ${title}`);

        // Create the new embed structure
        const newEmbed = `
  <figure
    class="w-richtext-figure-type-video w-richtext-align-fullwidth"
    style="padding-bottom: 56.206088992974244%"
    data-rt-type="video"
    data-rt-align="fullwidth"
    data-rt-max-width=""
    data-rt-max-height="56.206088992974244%"
    data-rt-dimensions="854:480"
    data-page-url="https://www.youtube.com/watch?v=${videoId}"
  >
    <div id="">
      <iframe
        allowfullscreen="true"
        frameborder="0"
        scrolling="no"
        src="https://www.youtube.com/embed/${videoId}"
        title="${title}"
      ></iframe>
    </div>
  </figure>`;

        // Replace the old iframe structure with the new embed
        cellValue = cellValue.replace(match[0], newEmbed);
        cellsUpdated++; // Increment the counter for updated cells
      } else {
        Logger.log(`No match found for Row ${rowIndex + 1}: ${cellValue}`);
      }

      return [cellValue]; // Return the updated cell
    }
    return row; // Return the original row if no matches
  });

  // Write back the updated values to the spreadsheet
  range.setValues(updatedValues);

  // Provide feedback to the user
  SpreadsheetApp.getUi().alert(`${cellsUpdated} YouTube embeds updated in column C. Check logs for details.`);
}

/*
//----------- Extract tags from a column, make them unique, slugify, add to new spreadsheet -----------//
*/
function extractUniqueTagsToNewSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const tagColumnIndex = 26; // Column Z
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(1, tagColumnIndex, lastRow);
  const values = range.getValues();

  const tagSet = new Set();

  // Collect and split tags
  for (let i = 0; i < values.length; i++) {
    const cell = values[i][0];
    if (cell && typeof cell === 'string') {
      const tags = cell.split('|').map(t => t.trim());
      tags.forEach(tag => {
        if (tag) tagSet.add(tag);
      });
    }
  }

  // Convert to array and generate slugs
  const tagArray = Array.from(tagSet).sort();
  const tagData = tagArray.map(tag => [tag, tag.toLowerCase().replace(/\s+/g, '-')]);

  // Create or clear 'Unique Tags' sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let tagSheet = ss.getSheetByName('Unique Tags');

  if (tagSheet) {
    tagSheet.clear(); // Wipe old data
  } else {
    tagSheet = ss.insertSheet('Unique Tags');
  }

  // Write headers
  tagSheet.getRange(1, 1, 1, 2).setValues([['Tag', 'Slug']]);

  // Write tag data
  tagSheet.getRange(2, 1, tagData.length, 2).setValues(tagData);
}
/*
//----------- Create excerpt from the first two sentences -----------//
*/
function extractFirstTwoSentences() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const inputRange = sheet.getRange(1, 3, lastRow); // Column C
  const outputRange = sheet.getRange(1, 4, lastRow); // Column D
  const inputValues = inputRange.getValues();
  const outputValues = [];

  for (let i = 0; i < inputValues.length; i++) {
    const htmlContent = inputValues[i][0];

    if (typeof htmlContent === 'string' && htmlContent.trim() !== '') {
      // Remove HTML tags
      const text = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      // Split into sentences
      const sentences = text.match(/[^.!?]+[.!?]/g);

      if (sentences && sentences.length > 0) {
        // Get the first two sentences
        const summary = sentences.slice(0, 2).join(' ').trim();
        outputValues.push([summary]);
      } else {
        // No sentence found, just push cleaned text
        outputValues.push([text]);
      }
    } else {
      outputValues.push(['']); // Empty or non-string cell
    }
  }

  // Write to Column D
  outputRange.setValues(outputValues);
}
