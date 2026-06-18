import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function parseStateGraph(filePath) {
  if (!fs.existsSync(filePath)) return 'UNINITIALIZED';
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/\*\*STATUS:\*\*\s*`([A-Z_]+)`/i);
  return match ? match[1].toUpperCase() : 'UNKNOWN';
}

function parseEventsMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const events = [];
  let inTable = false;
  
  for (const line of lines) {
    if (line.includes('## Event Log')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (line.trim() === '' && events.length > 0) {
        break;
      }
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 7 && !parts[1].startsWith('---') && !parts[1].toLowerCase().startsWith('timestamp')) {
        const timestamp = parts[1];
        const type = parts[2].replace(/`/g, '');
        const emitter_role = parts[3].replace(/`/g, '');
        const target_role = parts[4].replace(/`/g, '');
        const description = parts[5];
        const status = parts[6].replace(/`/g, '');
        
        if (timestamp && type) {
          events.push({
            timestamp: new Date(timestamp).toISOString(),
            type,
            emitter_role,
            target_role,
            description,
            status
          });
        }
      }
    }
  }
  return events;
}

export async function GET() {
  const rootDir = path.resolve(process.cwd(), '../');
  const runtimeDir = path.join(rootDir, '.agents', 'ai-runtime');
  
  try {
    const statePath = path.join(runtimeDir, 'STATE_GRAPH.md');
    const eventsPath = path.join(runtimeDir, 'EVENTS.md');
    
    const currentState = parseStateGraph(statePath);
    const events = parseEventsMarkdown(eventsPath);
    
    return NextResponse.json({
      state: { current_state: currentState },
      events,
      success: true
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
