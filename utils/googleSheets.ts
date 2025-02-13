import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface GoogleSheetsConfig {
  credentials: {
    client_email: string;
    private_key: string;
  };
  spreadsheetId: string;
}

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet;
  private credentials: {
    client_email: string;
    private_key: string;
  };

  constructor(config: GoogleSheetsConfig) {
    this.doc = new GoogleSpreadsheet(config.spreadsheetId, new JWT({
      email: config.credentials.client_email,
      key: config.credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    }));
    this.credentials = config.credentials;
  }

  async init() {
    try {
      await this.doc.loadInfo();
      return true;
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
      return false;
    }
  }

  async readRows(sheetIndex: number = 0): Promise<Record<string, any>[]> {
    try {
      const sheet = this.doc.sheetsByIndex[sheetIndex];
      const rows = await sheet.getRows();
      return rows.map(row => row.toObject());
    } catch (error) {
      console.error('Error reading rows:', error);
      return [];
    }
  }

  async addRow(data: Record<string, any>, sheetIndex: number = 0): Promise<boolean> {
    try {
      const sheet = this.doc.sheetsByIndex[sheetIndex];
      await sheet.addRow(data);
      return true;
    } catch (error) {
      console.error('Error adding row:', error);
      return false;
    }
  }

  async updateRow(rowIndex: number, data: Record<string, any>, sheetIndex: number = 0): Promise<boolean> {
    try {
      const sheet = this.doc.sheetsByIndex[sheetIndex];
      const rows = await sheet.getRows();
      const row = rows[rowIndex];
      
      if (!row) return false;

      Object.keys(data).forEach(key => {
        if (key in row) {
          (row as any)[key] = data[key];
        }
      });

      await row.save();
      return true;
    } catch (error) {
      console.error('Error updating row:', error);
      return false;
    }
  }

  async deleteRow(rowIndex: number, sheetIndex: number = 0): Promise<boolean> {
    try {
      const sheet = this.doc.sheetsByIndex[sheetIndex];
      const rows = await sheet.getRows();
      const row = rows[rowIndex];
      
      if (!row) return false;

      await row.delete();
      return true;
    } catch (error) {
      console.error('Error deleting row:', error);
      return false;
    }
  }
} 