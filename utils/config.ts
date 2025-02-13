export const googleSheetsConfig = {
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
}; 