import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function parseStrategy10y(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const phases = [];
  let currentPhase = null;
  
  for (const line of lines) {
    const match = line.match(/^###\s+Year\s+(\d+-\d+):\s*([^[#\n]+)(?:\[STATUS:\s*([A-Z_]+)\])?/i);
    if (match) {
      if (currentPhase) {
        phases.push(currentPhase);
      }
      currentPhase = {
        years: match[1].trim(),
        title: match[2].trim(),
        status: match[3] ? match[3].toUpperCase() : 'PLANNED',
        focus: '',
        milestones: []
      };
      continue;
    }
    
    if (currentPhase) {
      const focusMatch = line.match(/^-\s+\*\*Focus\*\*:\s*(.*)/i);
      if (focusMatch) {
        currentPhase.focus = focusMatch[1].trim();
        continue;
      }
      
      const milestoneMatch = line.match(/^\s*-\s+(.*)/);
      if (milestoneMatch) {
        const cleanVal = milestoneMatch[1].trim();
        if (!line.toLowerCase().includes('**focus**') && !cleanVal.toLowerCase().startsWith('**milestones**') && !cleanVal.toLowerCase().startsWith('milestones:')) {
          currentPhase.milestones.push(cleanVal);
        }
      }
    }
  }
  
  if (currentPhase) {
    phases.push(currentPhase);
  }
  return phases;
}

export async function GET() {
  const rootDir = path.resolve(process.cwd(), '../');
  const roadmapPath = path.join(rootDir, '.agents', 'ai-company', 'strategy-10y.md');
  
  if (!fs.existsSync(roadmapPath)) {
    return NextResponse.json({ success: true, phases: [] });
  }
  
  try {
    const phases = parseStrategy10y(roadmapPath);
    return NextResponse.json({
      success: true,
      phases
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
