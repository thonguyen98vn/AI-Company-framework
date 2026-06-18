#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import util from 'util';

const execPromise = util.promisify(exec);

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const program = new Command();

program
  .name('create-ai-company')
  .description('Scaffold an AI-Native Company Framework project')
  .version('1.0.0');

program
  .command('init [project-directory]', { isDefault: true })
  .description('Initialize a new AI company framework')
  .action(async (projectDir) => {
    console.log(chalk.cyan.bold('\n🚀 Welcome to AI Company Framework V3\n'));

    let targetDir = projectDir;
    let templateChoice = 'minimal';

    if (!targetDir) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'dir',
          message: 'What is the name of your project?',
          default: 'my-ai-company'
        },
        {
          type: 'select',
          name: 'template',
          message: 'Which template do you want to start with?',
          choices: [
            { name: 'Minimal (Core AI Framework only)', value: 'minimal' },
            { name: 'Full (Includes Domain Presets like Web3, Mobile, GameDev)', value: 'full' }
          ],
          default: 'minimal'
        }
      ]);
      targetDir = answers.dir;
      templateChoice = answers.template;
    } else {
      const templateAnswer = await inquirer.prompt([
        {
          type: 'select',
          name: 'template',
          message: 'Which template do you want to start with?',
          choices: [
            { name: 'Minimal (Core AI Framework only)', value: 'minimal' },
            { name: 'Full (Includes Domain Presets like Web3, Mobile, GameDev)', value: 'full' }
          ],
          default: 'minimal'
        }
      ]);
      templateChoice = templateAnswer.template;
    }

    const targetPath = path.resolve(process.cwd(), targetDir);

    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    console.log(chalk.blue('\n[1/4] Downloading framework template...'));

    try {
      // Create a temporary directory in OS temp folder
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-company-'));
      const tempZip = path.join(tempDir, 'main.zip');
      
      // Download using curl
      await execPromise(`curl -sL https://github.com/thonguyen98vn/AI-Company-framework/archive/refs/heads/main.zip -o "${tempZip}"`);
      
      console.log(chalk.blue('[2/4] Extracting files...'));
      // Unzip using standard tools (windows: tar, mac/linux: unzip)
      if (process.platform === 'win32') {
        await execPromise(`tar -xf "${tempZip}" -C "${tempDir}"`);
      } else {
        await execPromise(`unzip -q "${tempZip}" -d "${tempDir}"`);
      }

      console.log(chalk.blue('[3/4] Configuring AI Rules...'));
      const extractedFolder = path.join(tempDir, 'AI-Company-framework-main', 'template', templateChoice, '.agents');
      
      // Move .agents to target root
      copyRecursiveSync(extractedFolder, path.join(targetPath, '.agents'));
      
      // Setup IDE Rules
      const ruleContent = `
# AI Company Framework Auto-Trigger
This project is governed by the **AI Company Framework**. 

SUPREME DIRECTIVES FOR ALL AI AGENTS (Cursor, Copilot, Cline, Antigravity, etc.):
1. **Agent Self-Awareness:** Identify which AI Agent system you are currently running as.
2. **Language Agnosticism:** Core files are in English, but speak in the user's language.
3. **The Interception Rule:** When the user sends their FIRST message, you MUST read \`.agents/ai-founder/VISION_LOCK.md\`.
   - If \`UNINITIALIZED\`, DECLINE the request and read \`.agents/skills/start-ai-company/SKILL.md\` to conduct the Founder Interview.
`;

      fs.writeFileSync(path.join(targetPath, '.cursorrules'), ruleContent.trim());
      fs.writeFileSync(path.join(targetPath, '.windsurfrules'), ruleContent.trim());
      fs.writeFileSync(path.join(targetPath, '.clauderules'), ruleContent.trim());
      fs.writeFileSync(path.join(targetPath, '.codexrules'), ruleContent.trim());
      fs.writeFileSync(path.join(targetPath, '.agents', 'AGENTS.md'), ruleContent.trim());
      
      const githubDir = path.join(targetPath, '.github');
      if (!fs.existsSync(githubDir)) fs.mkdirSync(githubDir);
      fs.writeFileSync(path.join(githubDir, 'copilot-instructions.md'), ruleContent.trim());

      console.log(chalk.blue('[4/4] Cleaning up...'));
      // Note: We skip deleting tempDir because fs.rmSync occasionally causes a native STATUS_STACK_BUFFER_OVERRUN crash on Windows in Node v24.
      // The OS will automatically clean up the %TEMP% directory anyway.

      console.log(chalk.green('\n✅ Framework initialized successfully!'));
      
      console.log('\nNext steps:');
      console.log(chalk.cyan(`  cd ${targetDir}`));
      console.log(chalk.cyan(`  Open this folder in Cursor, VSCode, or Windsurf`));
      console.log(chalk.cyan(`  Type "hello" in the AI Chat to start the Founder Interview!\n`));

    } catch (error) {
      console.log(chalk.red('\n❌ Failed to initialize framework.'));
      console.error(error);
    }
  });

program
  .command('add <type> <name>')
  .description('Add a domain preset or skill to your AI company (e.g. add domain saas)')
  .action(async (type, name) => {
    const targetType = type.toLowerCase();
    if (targetType !== 'domain' && targetType !== 'skill') {
      console.error(chalk.red('Error: Type must be either "domain" or "skill".'));
      process.exit(1);
    }
    
    const activeProjectAgentsDir = path.join(process.cwd(), '.agents');
    if (!fs.existsSync(activeProjectAgentsDir)) {
      console.error(chalk.red('Error: .agents directory not found. Please run this command from the project root.'));
      process.exit(1);
    }
    
    console.log(chalk.blue(`\n📥 Fetching remote ${targetType}: "${name}"...`));
    
    try {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-company-add-'));
      const tempZip = path.join(tempDir, 'main.zip');
      
      await execPromise(`curl -sL https://github.com/thonguyen98vn/AI-Company-framework/archive/refs/heads/main.zip -o "${tempZip}"`);
      
      if (process.platform === 'win32') {
        await execPromise(`tar -xf "${tempZip}" -C "${tempDir}"`);
      } else {
        await execPromise(`unzip -q "${tempZip}" -d "${tempDir}"`);
      }
      
      let sourcePath = '';
      let targetPath = '';
      
      if (targetType === 'domain') {
        sourcePath = path.join(tempDir, 'AI-Company-framework-main', 'template', 'full', '.agents', 'ai-domains', name);
        targetPath = path.join(activeProjectAgentsDir, 'ai-domains', name);
      } else {
        sourcePath = path.join(tempDir, 'AI-Company-framework-main', 'template', 'full', '.agents', 'skills', name);
        targetPath = path.join(activeProjectAgentsDir, 'skills', name);
      }
      
      if (!fs.existsSync(sourcePath)) {
        console.error(chalk.red(`Error: Requested ${targetType} "${name}" not found in remote repository presets.`));
        process.exit(1);
      }
      
      if (fs.existsSync(targetPath)) {
        console.log(chalk.yellow(`⚠️ ${targetType} "${name}" already exists locally. Overwriting...`));
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      
      copyRecursiveSync(sourcePath, targetPath);
      console.log(chalk.green(`\n✅ Successfully added ${targetType} "${name}" to ${path.relative(process.cwd(), targetPath)}`));
      
    } catch (error) {
      console.error(chalk.red('\n❌ Failed to add component.'));
      console.error(error);
      process.exit(1);
    }
  });

function getRuntimePaths() {
  const runtimeDir = path.join(process.cwd(), '.agents', 'ai-runtime');
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
            timestamp,
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

function appendEventMarkdown(filePath, event) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8').trim();
  const dateStr = new Date().toISOString().split('T')[0];
  const row = `| ${dateStr} | \`${event.type}\` | \`${event.emitter_role}\` | \`${event.target_role}\` | ${event.description} | \`${event.status}\` |`;
  content += `\n${row}`;
  fs.writeFileSync(filePath, content + '\n', 'utf8');
  return true;
}

program
  .command('event')
  .description('Manage AI framework events')
  .argument('<action>', 'Action to perform (emit, list)')
  .option('-t, --type <type>', 'Event type (HANDOFF_REQ, AUDIT_REQ, USER_BLOCK, RELEASE_REQ, FEEDBACK_RECEIVED)')
  .option('-d, --desc <description>', 'Event description')
  .option('-e, --emitter <role>', 'Emitter role', 'System')
  .option('-r, --target <role>', 'Target role', 'All')
  .action((action, options) => {
    const { events: eventsPath } = getRuntimePaths();
    
    if (action === 'emit') {
      const { type, desc, emitter, target } = options;
      if (!type || !desc) {
        console.error(chalk.red('Error: --type and --desc are required to emit an event.'));
        process.exit(1);
      }
      
      const success = appendEventMarkdown(eventsPath, {
        type,
        emitter_role: emitter,
        target_role: target,
        description: desc,
        status: 'UNACKNOWLEDGED'
      });
      
      if (success) {
        console.log(chalk.green(`✅ Event emitted in EVENTS.md: ${type} -> ${target}`));
      } else {
        console.error(chalk.red(`❌ Error: EVENTS.md not found at ${eventsPath}`));
        process.exit(1);
      }
    } else if (action === 'list') {
      const events = parseEventsMarkdown(eventsPath);
      if (events.length === 0) {
        console.log(chalk.yellow('No events found or EVENTS.md does not exist.'));
        return;
      }
      console.log(chalk.cyan.bold('\n--- EVENT LOG STREAM ---'));
      events.forEach(ev => {
        console.log(`${chalk.gray(ev.timestamp)} | ${chalk.yellow(ev.type)} | ${chalk.blue(ev.emitter_role)} -> ${chalk.blue(ev.target_role)} | ${ev.description} | status: ${ev.status === 'ACKNOWLEDGED' ? chalk.green(ev.status) : chalk.red(ev.status)}`);
      });
      console.log('');
    } else {
      console.log(chalk.yellow(`Unknown action: ${action}`));
    }
  });

program
  .command('state')
  .description('Manage AI framework state')
  .argument('<action>', 'Action to perform (transition, current)')
  .option('-t, --to <state>', 'State to transition to')
  .option('-r, --reason <reason>', 'Reason for transition', 'Automated transition')
  .action((action, options) => {
    const { stateGraph: statePath, handoff: handoffPath, events: eventsPath } = getRuntimePaths();
    
    if (action === 'transition') {
      const { to, reason } = options;
      if (!to) {
        console.error(chalk.red('Error: --to is required for state transition.'));
        process.exit(1);
      }
      
      const allowedStates = ['UNINITIALIZED', 'INITIALIZED', 'PLANNING', 'EXECUTING', 'AUDITING', 'RELEASING', 'USER_FEEDBACK'];
      const targetState = to.toUpperCase();
      if (!allowedStates.includes(targetState)) {
        console.error(chalk.red(`Error: Invalid state "${to}". Allowed states: ${allowedStates.join(', ')}`));
        process.exit(1);
      }
      
      const currentState = parseStateGraph(statePath);
      
      const success1 = writeStateGraph(statePath, targetState);
      const success2 = updateHandoffStatus(handoffPath, targetState);
      
      if (success1) {
        appendEventMarkdown(eventsPath, {
          type: 'HANDOFF_REQ',
          emitter_role: 'System',
          target_role: 'All',
          description: `State transitioned from ${currentState} to ${targetState}. Reason: ${reason}`,
          status: 'ACKNOWLEDGED'
        });
        
        console.log(chalk.green(`✅ State transitioned successfully from ${currentState} to ${targetState}`));
      } else {
        console.error(chalk.red(`❌ Error: STATE_GRAPH.md not found at ${statePath}`));
        process.exit(1);
      }
    } else if (action === 'current') {
      const currentState = parseStateGraph(statePath);
      console.log(chalk.cyan(`Current State: ${currentState}`));
    } else {
      console.log(chalk.yellow(`Unknown action: ${action}`));
    }
  });

program
  .command('verify')
  .description('Verify framework health (Freshness & Drift Scores)')
  .action(() => {
    console.log(chalk.blue('🔍 Verifying Framework Health...'));
    const agentsDir = path.join(process.cwd(), '.agents');
    
    if (!fs.existsSync(agentsDir)) {
      console.error(chalk.red('Error: .agents directory not found. Are you in the project root?'));
      process.exit(1);
    }
    
    // Freshness Score Calculator
    let totalFiles = 0;
    let staleFiles = 0;
    
    function checkFreshness(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          checkFreshness(fullPath);
        } else if (file.endsWith('.md')) {
          totalFiles++;
          const content = fs.readFileSync(fullPath, 'utf8');
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const fm = frontmatterMatch[1];
            if (fm.includes('review_cadence: never')) return;
            
            const lastReviewedMatch = fm.match(/last_reviewed:\s*([^\n]+)/);
            if (lastReviewedMatch) {
              const lastReviewed = new Date(lastReviewedMatch[1].trim());
              const now = new Date();
              const diffDays = Math.floor((now - lastReviewed) / (1000 * 60 * 60 * 24));
              
              const cadenceMatch = fm.match(/review_cadence:\s*([^\n]+)/);
              const cadence = cadenceMatch ? cadenceMatch[1].trim() : 'weekly';
              
              let maxDays = 7;
              if (cadence === 'daily') maxDays = 1;
              if (cadence === 'monthly') maxDays = 30;
              
              if (diffDays > maxDays) {
                staleFiles++;
                console.log(chalk.yellow(`⚠️ Stale file: ${path.relative(process.cwd(), fullPath)} (last reviewed ${diffDays} days ago)`));
              }
            } else {
              staleFiles++;
              console.log(chalk.yellow(`⚠️ Missing last_reviewed: ${path.relative(process.cwd(), fullPath)}`));
            }
          }
        }
      });
    }
    
    checkFreshness(agentsDir);
    
    const freshnessScore = totalFiles > 0 ? Math.round(((totalFiles - staleFiles) / totalFiles) * 100) : 100;
    
    // Drift Score Calculator
    let driftScore = 100;
    const archPath = path.join(agentsDir, 'ai-execution', 'ARCHITECTURE.md');
    if (fs.existsSync(archPath)) {
      const archContent = fs.readFileSync(archPath, 'utf8');
      // Look for file paths mentioned in backticks or lists
      const fileRegex = /`([^`]+)`/g;
      let match;
      let filesChecked = 0;
      let filesMissing = 0;
      
      while ((match = fileRegex.exec(archContent)) !== null) {
        const potentialFile = match[1];
        if (potentialFile.includes('.') && !potentialFile.includes(' ') && potentialFile.length > 2) {
          // It looks like a file path
          const fullPath = path.join(process.cwd(), potentialFile);
          if (potentialFile.startsWith('src/') || potentialFile.startsWith('components/')) {
            filesChecked++;
            if (!fs.existsSync(fullPath)) {
              filesMissing++;
              console.log(chalk.red(`❌ Drift Detected: ${potentialFile} mentioned in ARCHITECTURE.md but does not exist.`));
            }
          }
        }
      }
      if (filesChecked > 0) {
        driftScore = Math.round(((filesChecked - filesMissing) / filesChecked) * 100);
      }
    } else {
      console.log(chalk.yellow('⚠️ ARCHITECTURE.md not found. Cannot calculate Drift Score.'));
      driftScore = 'N/A';
    }
    
    // Output
    console.log('\n--- HEALTH REPORT ---');
    console.log(`Freshness Score: ${freshnessScore < 80 ? chalk.red(freshnessScore + '%') : chalk.green(freshnessScore + '%')} (${totalFiles - staleFiles}/${totalFiles} files up to date)`);
    console.log(`Drift Score: ${driftScore === 'N/A' ? chalk.yellow('N/A') : (driftScore < 80 ? chalk.red(driftScore + '%') : chalk.green(driftScore + '%'))}`);
  });

program
  .command('agent <role>')
  .description('Invoke a specific AI agent by role (e.g. audit-agent, event-handler)')
  .action((role) => {
    const agentsDir = path.join(process.cwd(), '.agents', 'skills');
    const rolePath = path.join(agentsDir, role, 'SKILL.md');
    
    if (fs.existsSync(rolePath)) {
      console.log(chalk.blue(`🤖 Invoking agent: ${role}...`));
      console.log(chalk.cyan(`Reading skill definition from ${rolePath}`));
      // In a real CLI, this would spawn an LLM chain or trigger an API call
      // with the SKILL.md content as the system prompt.
      console.log(chalk.green(`✅ Agent ${role} invoked successfully! (Simulation mode)`));
    } else {
      console.error(chalk.red(`❌ Error: Agent role '${role}' not found in .agents/skills/`));
    }
  });

function acknowledgeEventInMarkdown(filePath, type, description) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let updated = false;
  
  for (let i = 0; i < lines.length; i++) {
    const cleanLine = lines[i].replace(/`/g, '');
    if (cleanLine.includes(type) && cleanLine.includes(description) && lines[i].includes('UNACKNOWLEDGED')) {
      lines[i] = lines[i].replace('UNACKNOWLEDGED', 'ACKNOWLEDGED');
      updated = true;
      break;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    return true;
  }
  return false;
}

program
  .command('orchestrate')
  .description('Automatically process and dispatch pending framework events')
  .action(async () => {
    const { events: eventsPath, stateGraph: statePath, handoff: handoffPath } = getRuntimePaths();
    
    if (!fs.existsSync(eventsPath)) {
      console.error(chalk.red('Error: EVENTS.md not found. Are you in the project root?'));
      process.exit(1);
    }
    
    const events = parseEventsMarkdown(eventsPath);
    const pendingEvents = events.filter(e => e.status === 'UNACKNOWLEDGED');
    
    if (pendingEvents.length === 0) {
      console.log(chalk.green('✨ No pending events to orchestrate. Framework is idle.'));
      return;
    }
    
    console.log(chalk.blue(`🤖 Found ${pendingEvents.length} pending event(s) to process.\n`));
    
    for (const ev of pendingEvents) {
      console.log(chalk.bold(`[Event] ${chalk.yellow(ev.type)} from ${chalk.blue(ev.emitter_role)} targeting ${chalk.blue(ev.target_role)}`));
      console.log(`Description: ${ev.description}`);
      
      const skillsDir = path.join(process.cwd(), '.agents', 'skills');
      const skillPath = path.join(skillsDir, ev.target_role, 'SKILL.md');
      
      if (fs.existsSync(skillPath)) {
        console.log(chalk.cyan(`-> Loading skill definition from ${path.relative(process.cwd(), skillPath)}...`));
        const skillContent = fs.readFileSync(skillPath, 'utf8');
        
        const matchDesc = skillContent.match(/description:\s*([^\n]+)/);
        if (matchDesc) {
          console.log(chalk.gray(`   Skill Description: ${matchDesc[1].trim()}`));
        }
        
        console.log(chalk.bold('\n   📋 Execution Steps:'));
        const lines = skillContent.split('\n');
        let inSteps = false;
        lines.forEach(l => {
          if (l.startsWith('# ') || l.startsWith('## ')) {
            if (l.toLowerCase().includes('step') || l.toLowerCase().includes('how to')) {
              inSteps = true;
            } else if (inSteps && !l.toLowerCase().includes('step')) {
              inSteps = false;
            }
          }
          if (inSteps && l.trim() !== '') {
            console.log(`   ${chalk.gray(l.trim())}`);
          }
        });
        console.log('');
      } else {
        console.log(chalk.yellow(`-> No specific skill defined for role "${ev.target_role}". Executing generic dispatch.`));
      }
      
      let nextState = null;
      if (ev.type === 'AUDIT_REQ') {
        nextState = 'AUDITING';
      } else if (ev.type === 'RELEASE_REQ') {
        nextState = 'RELEASING';
      } else if (ev.type === 'FEEDBACK_RECEIVED') {
        nextState = 'USER_FEEDBACK';
      } else if (ev.type === 'HANDOFF_REQ') {
        if (ev.target_role.toLowerCase() === 'planner') {
          nextState = 'PLANNING';
        } else if (ev.target_role.toLowerCase() === 'coder' || ev.target_role.toLowerCase() === 'execution_agent') {
          nextState = 'EXECUTING';
        }
      }
      
      if (nextState) {
        const currentState = parseStateGraph(statePath);
        if (currentState !== nextState) {
          writeStateGraph(statePath, nextState);
          updateHandoffStatus(handoffPath, nextState);
          console.log(chalk.green(`🔄 State auto-transitioned: ${currentState} -> ${nextState}`));
        }
      }
      
      const acked = acknowledgeEventInMarkdown(eventsPath, ev.type, ev.description);
      if (acked) {
        console.log(chalk.green(`✅ Event successfully processed and ACKNOWLEDGED.\n`));
      } else {
        console.log(chalk.red(`❌ Failed to update event status in EVENTS.md.\n`));
      }
    }
  });

program
  .command('audit')
  .description('Audit codebase against NON_NEGOTIABLES.md rules')
  .action(() => {
    console.log(chalk.blue('🔍 Running Automated Codebase Audit...\n'));
    let violations = [];
    
    const maxLines = 300;
    
    function scanDirectory(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
            scanDirectory(fullPath);
          }
        } else if (file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.ts')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const linesCount = content.split('\n').length;
          if (linesCount > maxLines) {
            violations.push({
              file: path.relative(process.cwd(), fullPath),
              rule: `File length exceeds ${maxLines} lines (${linesCount} lines)`,
              severity: 'WARNING'
            });
          }
          
          const secretPatterns = [
            /const\s+\w+key\s*=\s*['"`][a-zA-Z0-9_\-]{16,}['"`]/i,
            /const\s+\w+token\s*=\s*['"`][a-zA-Z0-9_\-]{16,}['"`]/i,
            /const\s+\w+password\s*=\s*['"`][a-zA-Z0-9_\-]{8,}['"`]/i
          ];
          secretPatterns.forEach(pat => {
            if (pat.test(content)) {
              violations.push({
                file: path.relative(process.cwd(), fullPath),
                rule: 'Potential hardcoded API key, token, or password found',
                severity: 'HIGH'
              });
            }
          });
        }
      });
    }
    
    scanDirectory(path.join(process.cwd(), 'cli'));
    scanDirectory(path.join(process.cwd(), 'dashboard'));
    
    if (violations.length === 0) {
      console.log(chalk.green('✅ Audit passed! Zero violations found.'));
    } else {
      console.log(chalk.red(`❌ Audit failed with ${violations.length} violation(s):\n`));
      violations.forEach(v => {
        const severityColor = v.severity === 'HIGH' ? chalk.red.bold : chalk.yellow;
        console.log(`- [${severityColor(v.severity)}] ${chalk.bold(v.file)}: ${v.rule}`);
      });
      
      const dateStr = new Date().toISOString().split('T')[0];
      const reportsDir = path.join(process.cwd(), '.agents', 'reports');
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
      
      const reportPath = path.join(reportsDir, `${dateStr}-audit.md`);
      let reportContent = `# Audit Report - ${dateStr}\n\n`;
      reportContent += `**Status**: FAIL\n`;
      reportContent += `**Violations Found**: ${violations.length}\n\n`;
      reportContent += `## Violations List\n`;
      violations.forEach(v => {
        reportContent += `- **[${v.severity}]** \`${v.file}\`: ${v.rule}\n`;
      });
      
      fs.writeFileSync(reportPath, reportContent, 'utf8');
      console.log(chalk.cyan(`\nReport written to: ${path.relative(process.cwd(), reportPath)}`));
      process.exit(1);
    }
  });

program
  .command('handoff')
  .description('Write a session handoff report to HANDOFF.md and update status')
  .option('-t, --to <state>', 'Transition to this state next (default: PLANNING)')
  .action(async (options) => {
    const { handoff: handoffPath, stateGraph: statePath, events: eventsPath } = getRuntimePaths();
    
    if (!fs.existsSync(handoffPath)) {
      console.error(chalk.red('Error: HANDOFF.md not found. Are you in the project root?'));
      process.exit(1);
    }
    
    console.log(chalk.cyan.bold('\n 📝 Prepare Handoff Report\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What is your Agent Role?',
        default: 'Developer'
      },
      {
        type: 'input',
        name: 'accomplished',
        message: 'What was accomplished in this session?'
      },
      {
        type: 'input',
        name: 'nextSteps',
        message: 'What are the immediate next steps?'
      },
      {
        type: 'input',
        name: 'blockers',
        message: 'Are there any blockers or open bugs?',
        default: 'None.'
      }
    ]);
    
    const targetState = (options.to || 'PLANNING').toUpperCase();
    
    const dateStr = new Date().toISOString().split('T')[0];
    const handoffContent = `---
owner: Execution_Agent
status: ${targetState}
review_cadence: daily
last_reviewed: ${dateStr}
staleness_risk: high
---
# HANDOFF (Short-term / Session Memory)

> [!IMPORTANT]
> **MEMORY PROTOCOL: SEAMLESS TRANSITION**
> At the end of every work session, the active Agent MUST summarize the exact state of execution here.
> The next Agent assigned to work on the project MUST read this file FIRST to resume context.

## Last Session Summary
**Timestamp:** ${dateStr}
**Agent Role:** ${answers.role}

### What was accomplished?
- ${answers.accomplished.split('\n').join('\n- ')}

### What is the immediate next step?
- ${answers.nextSteps.split('\n').join('\n- ')}

### Are there any blockers or open bugs?
- ${answers.blockers.split('\n').join('\n- ')}
`;
    
    fs.writeFileSync(handoffPath, handoffContent, 'utf8');
    
    writeStateGraph(statePath, targetState);
    
    appendEventMarkdown(eventsPath, {
      type: 'HANDOFF_REQ',
      emitter_role: answers.role,
      target_role: targetState === 'PLANNING' ? 'Planner' : (targetState === 'EXECUTING' ? 'Coder' : 'All'),
      description: `Session complete. Handoff written. Next state: ${targetState}. Next steps: ${answers.nextSteps}`,
      status: 'UNACKNOWLEDGED'
    });
    
    console.log(chalk.green(`\n✅ Handoff report written successfully to ${path.relative(process.cwd(), handoffPath)}`));
    console.log(chalk.green(`🔄 State graph status transitioned to ${targetState}`));
  });

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

program
  .command('roadmap')
  .description('Display the 10-Year Strategic Roadmap and milestones')
  .action(() => {
    const roadmapPath = path.join(process.cwd(), '.agents', 'ai-company', 'strategy-10y.md');
    if (!fs.existsSync(roadmapPath)) {
      console.error(chalk.red(`Error: strategy-10y.md not found at ${roadmapPath}`));
      console.log(chalk.yellow('Please ensure you are in the project root and strategy-10y.md exists.'));
      process.exit(1);
    }
    
    console.log(chalk.cyan.bold('\n🗺️  10-YEAR DECADAL ROADMAP  🗺️\n'));
    
    const phases = parseStrategy10y(roadmapPath);
    phases.forEach(phase => {
      let statusColor = chalk.gray;
      if (phase.status === 'IN_PROGRESS') statusColor = chalk.yellow.bold;
      if (phase.status === 'COMPLETED') statusColor = chalk.green.bold;
      
      console.log(`${chalk.bold(`[Year ${phase.years}]`)} ${chalk.blue.bold(phase.title)} [${statusColor(phase.status)}]`);
      if (phase.focus) {
        console.log(`  ${chalk.gray('Focus:')} ${phase.focus}`);
      }
      if (phase.milestones && phase.milestones.length > 0) {
        console.log(chalk.gray('  Key Milestones:'));
        phase.milestones.forEach(m => {
          console.log(`    - ${m}`);
        });
      }
      console.log('');
    });
  });

program
  .command('test')
  .description('Run codebase tests and log results/events to the framework')
  .option('-w, --watch', 'Watch files and re-run tests in a loop')
  .option('-i, --interval <ms>', 'Loop interval in milliseconds (default: 10000) for polling mode', '10000')
  .action(async (options) => {
    const watchMode = options.watch;
    const interval = parseInt(options.interval, 10);
    const { events: eventsPath } = getRuntimePaths();
    
    console.log(chalk.blue('🧪 Running Automated Test Suite...\n'));
    
    const runTests = async () => {
      console.log(chalk.gray(`[${new Date().toLocaleTimeString()}] Executing test suite...`));
      
      let testCommand = 'npm test';
      let cwd = process.cwd();
      
      if (fs.existsSync(path.join(cwd, 'cli', 'package.json'))) {
        cwd = path.join(cwd, 'cli');
      }
      
      try {
        const { stdout } = await execPromise(testCommand, { cwd });
        console.log(chalk.green('✅ All tests passed successfully!'));
        
        writeTestReport(true, stdout);
        
        appendEventMarkdown(eventsPath, {
          type: 'TEST_PASS',
          emitter_role: 'Tester_Agent',
          target_role: 'All',
          description: 'Automated test suite passed successfully.',
          status: 'ACKNOWLEDGED'
        });
        
        return true;
      } catch (error) {
        console.log(chalk.red('❌ Tests failed!'));
        const errorLog = error.stdout || error.message;
        console.error(chalk.gray(errorLog));
        
        writeTestReport(false, errorLog);
        
        appendEventMarkdown(eventsPath, {
          type: 'TEST_FAIL',
          emitter_role: 'Tester_Agent',
          target_role: 'Coder',
          description: `Automated test suite failed. Error: ${error.message.substring(0, 100)}...`,
          status: 'UNACKNOWLEDGED'
        });
        
        return false;
      }
    };
    
    const writeTestReport = (success, log) => {
      const dateStr = new Date().toISOString().split('T')[0];
      const reportsDir = path.join(process.cwd(), '.agents', 'reports');
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
      
      const reportPath = path.join(reportsDir, `${dateStr}-test.md`);
      let reportContent = `# Test Run Report - ${dateStr}\n\n`;
      reportContent += `**Status**: ${success ? 'PASS' : 'FAIL'}\n`;
      reportContent += `**Timestamp**: ${new Date().toISOString()}\n\n`;
      reportContent += `## Test Execution Log\n\`\`\`\n${log}\n\`\`\`\n`;
      
      fs.writeFileSync(reportPath, reportContent, 'utf8');
    };
    
    await runTests();
    
    if (watchMode) {
      console.log(chalk.cyan(`\nWatching/polling for test changes every ${interval}ms. Press Ctrl+C to exit...\n`));
      setInterval(async () => {
        await runTests();
      }, interval);
      
      await new Promise(() => {});
    }
  });

program.parseAsync(process.argv);
