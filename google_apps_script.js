/**
 * ============================================================================
 * GOOGLE APPS SCRIPT FOR ANUJ GANGANE'S PORTFOLIO CONTACT FORM
 * ============================================================================
 * 
 * This script connects your personal portfolio website directly to your Google Sheet.
 * Every time a recruiter or visitor fills the "Send a Direct Message" form and clicks
 * "Submit", this script automatically adds a new row to your Google Sheet in real-time.
 * 
 * ----------------------------------------------------------------------------
 * 3-STEP SETUP INSTRUCTIONS (Takes less than 1 minute):
 * ----------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and create a new blank sheet.
 *    (You can name the file "Portfolio Inquiries").
 * 
 * 2. In the Google Sheets top menu, click:
 *    Extensions  ->  Apps Script
 * 
 * 3. Delete any code in the editor, copy and PASTE THIS ENTIRE SCRIPT, then:
 *    a) Click the blue "Deploy" button (top right) -> "New deployment".
 *    b) Click the gear/settings icon next to "Select type" -> choose "Web app".
 *    c) Fill in:
 *       - Description: "Portfolio Contact Receiver"
 *       - Execute as: "Me" (your Google account)
 *       - Who has access: "Anyone" (allows form submission from browser)
 *    d) Click "Deploy" and grant Google permissions if prompted.
 *    e) Copy the "Web app URL" (it starts with: https://script.google.com/macros/s/...)
 * 
 * 4. Paste that Web App URL into your website's js/script.js:
 *    const GOOGLE_SHEET_URL = 'PASTE_YOUR_COPIED_URL_HERE';
 * ============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Automatically set up professional headers if the sheet is blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date / Time", "Name", "Email", "Subject", "Message"]);
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#38BDF8");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }
    
    // Read submitted form fields
    var params = (e && e.parameter) ? e.parameter : {};
    
    var date = params.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm:ss a");
    var name = params.name || "N/A";
    var email = params.email || "N/A";
    var subject = params.subject || "N/A";
    var message = params.message || "";
    
    // Append the visitor's submission as a new row
    sheet.appendRow([date, name, email, subject, message]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Form submission appended to Google Sheet successfully."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional test function (can be run directly inside Apps Script editor to test appending)
function testAppend() {
  var mockEvent = {
    parameter: {
      date: Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm:ss a"),
      name: "Test Recruiter",
      email: "recruiter@example.com",
      subject: "Full-Stack .NET Developer Opportunity",
      message: "Hi Anuj, I came across your portfolio and would love to discuss an open software developer role."
    }
  };
  doPost(mockEvent);
}
