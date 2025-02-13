import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/utils/googleSheets';
import { googleSheetsConfig } from '@/utils/config';

// 初始化 Google Sheets 服務
const sheetsService = new GoogleSheetsService(googleSheetsConfig);

export async function GET() {
  try {
    const initialized = await sheetsService.init();
    if (!initialized) {
      return NextResponse.json({ error: 'Failed to initialize Google Sheets' }, { status: 500 });
    }

    const rows = await sheetsService.readRows();
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('Error in GET /api/sheets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const initialized = await sheetsService.init();
    
    if (!initialized) {
      return NextResponse.json({ error: 'Failed to initialize Google Sheets' }, { status: 500 });
    }

    const success = await sheetsService.addRow(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to add booking' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking added successfully' });
  } catch (error) {
    console.error('Error in POST /api/sheets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 