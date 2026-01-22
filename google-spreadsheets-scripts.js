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
function splitSpreadsheetIntoBatches() {
  const BATCH_SIZE = 500;
  const MAX_EXECUTION_TIME = 4 * 60 * 1000; // 4 minutes in milliseconds
  const startTime = new Date().getTime();
  
  try {
    // Get the active spreadsheet and sheet
    const sourceSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sourceSheet = sourceSpreadsheet.getActiveSheet();
    const sourceSheetName = sourceSheet.getName();
    
    console.log('Starting batch split process...');
    
    // Get data range info first to avoid loading all data at once
    const dataRange = sourceSheet.getDataRange();
    const numRows = dataRange.getNumRows();
    const numCols = dataRange.getNumColumns();
    
    console.log(`Source data: ${numRows} rows, ${numCols} columns`);
    
    // Check if we have enough data
    if (numRows <= 1) {
      SpreadsheetApp.getUi().alert('Error: Not enough data to split. Need at least 2 rows (header + data).');
      return;
    }
    
    // Calculate number of batches needed
    const dataRowsCount = numRows - 1; // Exclude header
    const totalBatches = Math.ceil(dataRowsCount / BATCH_SIZE);
    
    console.log(`Will create ${totalBatches} batch tabs`);
    
    // Show confirmation dialog
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Batch Split Confirmation',
      `This will create ${totalBatches} new tabs with up to ${BATCH_SIZE} rows each.\n\n` +
      `Total data rows: ${dataRowsCount}\n` +
      `Source sheet: "${sourceSheetName}"\n\n` +
      `Do you want to continue?`,
      ui.ButtonSet.YES_NO
    );
    
    if (response !== ui.Button.YES) {
      return;
    }
    
    // Get header row only once
    const headerRow = sourceSheet.getRange(1, 1, 1, numCols).getValues()[0];
    console.log('Header row retrieved');
    
    // Track created sheets
    const createdSheets = [];
    
    // Process batches one at a time to avoid memory issues
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      // Check execution time
      const currentTime = new Date().getTime();
      if (currentTime - startTime > MAX_EXECUTION_TIME) {
        ui.alert('Timeout Warning', 
          `Process stopped after ${batchIndex} batches due to timeout.\n` +
          `You can run the script again to continue with remaining batches.`, 
          ui.ButtonSet.OK);
        break;
      }
      
      console.log(`Processing batch ${batchIndex + 1} of ${totalBatches}`);
      
      const startRow = batchIndex * BATCH_SIZE + 2; // +2 because row 1 is header, start from row 2
      const rowsInThisBatch = Math.min(BATCH_SIZE, dataRowsCount - (batchIndex * BATCH_SIZE));
      
      if (rowsInThisBatch <= 0) break;
      
      // Get only the data needed for this batch
      const batchDataRange = sourceSheet.getRange(startRow, 1, rowsInThisBatch, numCols);
      const batchData = batchDataRange.getValues();
      
      console.log(`Retrieved ${batchData.length} rows for batch ${batchIndex + 1}`);
      
      // Create new sheet tab for this batch
      const batchSheetName = `${sourceSheetName}_Batch_${batchIndex + 1}`;
      
      try {
        // Check if sheet with this name already exists
        let newSheet = sourceSpreadsheet.getSheetByName(batchSheetName);
        if (newSheet) {
          // If exists, delete it first to avoid duplicates
          sourceSpreadsheet.deleteSheet(newSheet);
        }
        
        // Create new sheet
        newSheet = sourceSpreadsheet.insertSheet(batchSheetName);
        console.log(`Created sheet tab: ${batchSheetName}`);
        
        // Prepare data with header + batch data
        const batchWithHeader = [headerRow, ...batchData];
        
        // Write data to new sheet in one operation
        if (batchWithHeader.length > 0) {
          const range = newSheet.getRange(1, 1, batchWithHeader.length, batchWithHeader[0].length);
          range.setValues(batchWithHeader);
          
          // Format header row (make it bold)
          const headerRange = newSheet.getRange(1, 1, 1, headerRow.length);
          headerRange.setFontWeight('bold');
          headerRange.setBackground('#e6f3ff'); // Light blue background for header
          
          // Freeze header row
          newSheet.setFrozenRows(1);
          
          // Auto-resize columns for better visibility
          for (let col = 1; col <= numCols && col <= 10; col++) { // Limit to first 10 columns to avoid timeout
            newSheet.autoResizeColumn(col);
          }
          
          console.log(`Data written to batch ${batchIndex + 1}`);
        }
        
        // Store sheet info
        createdSheets.push({
          name: batchSheetName,
          rowCount: batchData.length + 1, // +1 for header
          dataRows: batchData.length
        });
        
      } catch (batchError) {
        console.error(`Error creating batch ${batchIndex + 1}:`, batchError);
        ui.alert('Batch Error', 
          `Error creating batch ${batchIndex + 1}:\n${batchError.toString()}\n\n` +
          `Continuing with remaining batches...`, 
          ui.ButtonSet.OK);
        continue;
      }
      
      // Add a small delay to avoid hitting rate limits
      Utilities.sleep(200);
    }
    
    // Create summary information
    let summaryMessage = `✅ Successfully created ${createdSheets.length} batch tabs!\n\n`;
    summaryMessage += `📊 Summary:\n`;
    summaryMessage += `• Total original rows: ${numRows} (including header)\n`;
    summaryMessage += `• Data rows split: ${dataRowsCount}\n`;
    summaryMessage += `• Batch size: ${BATCH_SIZE} rows + header\n`;
    summaryMessage += `• Tabs created: ${createdSheets.length} of ${totalBatches}\n\n`;
    
    if (createdSheets.length < totalBatches) {
      summaryMessage += `⚠️ Note: Process stopped early due to timeout. Run again to create remaining batches.\n\n`;
    }
    
    summaryMessage += `📁 Created sheet tabs:\n`;
    createdSheets.forEach((sheet, index) => {
      summaryMessage += `${index + 1}. ${sheet.name} (${sheet.dataRows} data rows + header)\n`;
    });
    
    // Show success message
    ui.alert('Batch Split Complete!', summaryMessage, ui.ButtonSet.OK);
    
    // Log sheet names for reference
    console.log('Created sheet tabs:');
    createdSheets.forEach(sheet => {
      console.log(`${sheet.name}: ${sheet.rowCount} total rows`);
    });
    
    // Activate the first batch sheet for easy access
    if (createdSheets.length > 0) {
      const firstBatchSheet = sourceSpreadsheet.getSheetByName(createdSheets[0].name);
      sourceSpreadsheet.setActiveSheet(firstBatchSheet);
    }
    
  } catch (error) {
    console.error('Main error:', error);
    SpreadsheetApp.getUi().alert('Error', 
      `An error occurred:\n\n${error.toString()}\n\n` +
      `Try running the script again. Large spreadsheets may need multiple runs.`, 
      SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

// Alternative function for very large spreadsheets - processes in smaller chunks
function splitLargeSpreadsheetSafely() {
  const BATCH_SIZE = 200; // Smaller batch size for large spreadsheets
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    'Safe Mode Split',
    `This version uses smaller batches (${BATCH_SIZE} rows) and is safer for very large spreadsheets.\n\n` +
    `Each batch will be created as a new tab in this same spreadsheet.\n\n` +
    `Do you want to continue with safe mode?`,
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    // Create a modified version with smaller batch size
    splitSpreadsheetIntoBatchesWithSize(BATCH_SIZE);
  }
}

// Helper function to split with custom batch size
function splitSpreadsheetIntoBatchesWithSize(customBatchSize) {
  const BATCH_SIZE = customBatchSize || 500;
  
  // Copy the main function logic but with custom batch size
  // (This is a simplified version - you could expand it to match the full function above)
  const sourceSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = sourceSpreadsheet.getActiveSheet();
  const allData = sourceSheet.getDataRange().getValues();
  
  if (allData.length <= 1) {
    SpreadsheetApp.getUi().alert('Error: Not enough data to split.');
    return;
  }
  
  const headerRow = allData[0];
  const dataRows = allData.slice(1);
  const totalBatches = Math.ceil(dataRows.length / BATCH_SIZE);
  
  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, dataRows.length);
    const batchData = dataRows.slice(start, end);
    
    const sheetName = `${sourceSheet.getName()}_Batch_${i + 1}`;
    let newSheet = sourceSpreadsheet.getSheetByName(sheetName);
    
    if (newSheet) {
      sourceSpreadsheet.deleteSheet(newSheet);
    }
    
    newSheet = sourceSpreadsheet.insertSheet(sheetName);
    const batchWithHeader = [headerRow, ...batchData];
    
    newSheet.getRange(1, 1, batchWithHeader.length, batchWithHeader[0].length).setValues(batchWithHeader);
    newSheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold').setBackground('#e6f3ff');
    newSheet.setFrozenRows(1);
  }
  
  SpreadsheetApp.getUi().alert('Complete!', `Created ${totalBatches} batch tabs with ${BATCH_SIZE} rows each.`, SpreadsheetApp.getUi().ButtonSet.OK);
}

// Function to clean up batch sheets
function deleteBatchSheets() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Delete Batch Sheets',
    'This will delete all sheets with "_Batch_" in their name.\n\nAre you sure?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets();
    let deletedCount = 0;
    
    sheets.forEach(sheet => {
      if (sheet.getName().includes('_Batch_')) {
        spreadsheet.deleteSheet(sheet);
        deletedCount++;
      }
    });
    
    ui.alert('Cleanup Complete', `Deleted ${deletedCount} batch sheets.`, ui.ButtonSet.OK);
  }
}

// Optional: Function to add menu items for easy access
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Batch Tools')
    .addItem('Split into 500-row batch tabs', 'splitSpreadsheetIntoBatches')
    .addItem('Safe mode (200-row batch tabs)', 'splitLargeSpreadsheetSafely')
    .addSeparator()
    .addItem('Delete all batch sheets', 'deleteBatchSheets')
    .addSeparator()
    .addItem('About Batch Splitter', 'showAbout')
    .addToUi();
}

// About function
function showAbout() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Batch Splitter Tool - Tab Version',
    'This tool splits your current spreadsheet into multiple new TABS (sheets)\n' +
    'within the same spreadsheet file.\n\n' +
    'Optimizations for large spreadsheets:\n' +
    '• Processes data in chunks to avoid memory issues\n' +
    '• Includes timeout protection\n' +
    '• Safe mode option for very large files\n' +
    '• Better error handling and recovery\n\n' +
    'Features:\n' +
    '• Creates new tabs (not new spreadsheet files)\n' +
    '• Preserves header row in each batch\n' +
    '• Auto-formats and freezes header rows\n' +
    '• Names tabs as "OriginalName_Batch_1", etc.\n' +
    '• Cleanup function to remove batch tabs\n\n' +
    'Perfect for organizing large datasets within one spreadsheet!',
    ui.ButtonSet.OK
  );
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
  // const youtubeRegex = /<p>\s*<iframe[^>]*?src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)[^>]*?title="([^"]+)"[^>]*?><\/iframe>\s*<\/p>/;
  // More flexible regex - <p> tags optional, title optional
  const youtubeRegex = /(?:<p>\s*)?<iframe[^>]*?src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)"[^>]*?(?:title="([^"]+)")?[^>]*?><\/iframe>(?:\s*<\/p>)?/g;

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
