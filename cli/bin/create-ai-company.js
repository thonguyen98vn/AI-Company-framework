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
  .command('add <plugin>')
  .description('Add a community plugin/skill to your AI company')
  .action((plugin) => {
    console.log(chalk.yellow(`\n📦 Plugin system is coming soon. You tried to add: ${plugin}\n`));
    console.log(chalk.cyan(`In the future, this will download ${plugin} from the AI Company Registry into .agents/skills/`));
  });

program.parseAsync(process.argv);
