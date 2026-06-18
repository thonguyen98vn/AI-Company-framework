import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const rootDir = path.resolve(process.cwd(), '../');
  const reportsDir = path.join(rootDir, '.agents', 'reports');
  
  if (!fs.existsSync(reportsDir)) {
    return NextResponse.json({ success: true, reports: [] });
  }
  
  try {
    const files = fs.readdirSync(reportsDir);
    const reports = [];
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const fullPath = path.join(reportsDir, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Parse status
        const statusMatch = content.match(/\*\*Status\*\*:\s*([A-Z_]+)/i);
        const status = statusMatch ? statusMatch[1].toUpperCase() : 'UNKNOWN';
        
        // Parse violations count
        const violationsMatch = content.match(/\*\*Violations Found\*\*:\s*(\d+)/i);
        const violationsCount = violationsMatch ? parseInt(violationsMatch[1], 10) : 0;
        
        // Parse violations details
        const violations = [];
        const lines = content.split('\n');
        let inList = false;
        
        lines.forEach(line => {
          if (line.includes('## Violations List')) {
            inList = true;
            return;
          }
          if (inList && line.startsWith('-')) {
            violations.push(line.replace(/^-\s*/, '').trim());
          }
        });
        
        reports.push({
          filename: file,
          date: file.replace('-audit.md', ''),
          status,
          violationsCount,
          violations
        });
      }
    });
    
    // Sort by date descending
    reports.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return NextResponse.json({
      success: true,
      reports
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
