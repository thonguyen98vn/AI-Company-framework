import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getRuntimePaths() {
  const rootDir = path.resolve(process.cwd(), '../');
  const runtimeDir = path.join(rootDir, '.agents', 'ai-runtime');
  return {
    stateGraph: path.join(runtimeDir, 'STATE_GRAPH.md'),
    events: path.join(runtimeDir, 'EVENTS.md'),
    handoff: path.join(runtimeDir, 'HANDOFF.md')
  };
}

function parseStateGraph(filePath) {
  if (!fs.existsSync(filePath)) return 'UNINITIALIZED';
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/\*\*STATUS:\*\*\s*`([A-Z_]+)`/i);
  return match ? match[1].toUpperCase() : 'UNKNOWN';
}

function writeStateGraph(filePath, newState) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/(\*\*STATUS:\*\*\s*`)([A-Z_]+)(`)/i, `$1${newState}$3`);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function updateHandoffStatus(filePath, newState) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/(status:\s*)([A-Z_]+)/i, `$1${newState}`);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function appendEventMarkdown(filePath, event) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8').trim();
  const dateStr = new Date().toISOString().split('T')[0];
  const row = `| ${dateStr} | \`${event.type}\` | \`${event.emitter_role}\` | \`${event.target_role}\` | ${event.description} | \`${event.status}\` |`;
  content += `\n${row}`;
  fs.writeFileSync(filePath, content + '\n', 'utf8');
  return true;
}

export async function POST(request) {
  try {
    const { action, to, reason, type, desc, emitter, target } = await request.json();
    const { stateGraph: statePath, handoff: handoffPath, events: eventsPath } = getRuntimePaths();
    
    if (action === 'transition') {
      if (!to) {
        return NextResponse.json({ success: false, error: 'Target state "to" is required' }, { status: 400 });
      }
      
      const allowedStates = ['UNINITIALIZED', 'INITIALIZED', 'PLANNING', 'EXECUTING', 'AUDITING', 'RELEASING', 'USER_FEEDBACK'];
      const targetState = to.toUpperCase();
      if (!allowedStates.includes(targetState)) {
        return NextResponse.json({ success: false, error: `Invalid state: ${to}` }, { status: 400 });
      }
      
      const currentState = parseStateGraph(statePath);
      writeStateGraph(statePath, targetState);
      updateHandoffStatus(handoffPath, targetState);
      
      appendEventMarkdown(eventsPath, {
        type: 'HANDOFF_REQ',
        emitter_role: 'Dashboard',
        target_role: 'All',
        description: `State transitioned from ${currentState} to ${targetState}. Reason: ${reason || 'Triggered from Web Dashboard'}`,
        status: 'ACKNOWLEDGED'
      });
      
      return NextResponse.json({ success: true, from: currentState, to: targetState });
      
    } else if (action === 'event') {
      if (!type || !desc) {
        return NextResponse.json({ success: false, error: 'Event "type" and "desc" are required' }, { status: 400 });
      }
      
      appendEventMarkdown(eventsPath, {
        type,
        emitter_role: emitter || 'Dashboard',
        target_role: target || 'All',
        description: desc,
        status: 'UNACKNOWLEDGED'
      });
      
      let nextState = null;
      if (type === 'AUDIT_REQ') {
        nextState = 'AUDITING';
      } else if (type === 'RELEASE_REQ') {
        nextState = 'RELEASING';
      } else if (type === 'FEEDBACK_RECEIVED') {
        nextState = 'USER_FEEDBACK';
      } else if (type === 'HANDOFF_REQ') {
        if (target && target.toLowerCase() === 'planner') {
          nextState = 'PLANNING';
        } else if (target && (target.toLowerCase() === 'coder' || target.toLowerCase() === 'execution_agent')) {
          nextState = 'EXECUTING';
        }
      }
      
      if (nextState) {
        const currentState = parseStateGraph(statePath);
        if (currentState !== nextState) {
          writeStateGraph(statePath, nextState);
          updateHandoffStatus(handoffPath, nextState);
        }
      }
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: `Invalid action: ${action}` }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
