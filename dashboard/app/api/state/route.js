import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const agentsPath = path.join(process.cwd(), '../.agents/ai-runtime/STATE_GRAPH.md');
    
    if (!fs.existsSync(agentsPath)) {
      return NextResponse.json({ status: 'UNKNOWN', error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(agentsPath, 'utf-8');
    const match = content.match(/\*\*STATUS:\*\*\s+`?([^`\n]+)`?/);
    const currentState = match ? match[1].trim() : 'UNKNOWN';

    return NextResponse.json({ state: currentState });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
