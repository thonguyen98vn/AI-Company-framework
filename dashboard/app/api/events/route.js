import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const eventsPath = path.join(process.cwd(), '../.agents/ai-runtime/EVENTS.md');
    
    if (!fs.existsSync(eventsPath)) {
      return NextResponse.json({ events: [], error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(eventsPath, 'utf-8');
    
    // Parse Markdown Table
    const lines = content.split('\n').filter(line => line.trim().startsWith('|'));
    
    // Remove header and separator
    const dataLines = lines.slice(2);
    
    const events = dataLines.map((line, index) => {
      const parts = line.split('|').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 6) {
        return {
          id: index,
          timestamp: parts[0],
          type: parts[1].replace(/`/g, ''),
          emitter: parts[2].replace(/`/g, ''),
          target: parts[3].replace(/`/g, ''),
          description: parts[4],
          status: parts[5].replace(/`/g, '')
        };
      }
      return null;
    }).filter(Boolean);

    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
