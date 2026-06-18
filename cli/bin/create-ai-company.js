#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('create-ai-company')
  .description('Scaffold an AI-Native Company Framework project')
  .version('1.0.0')
  .argument('[project-directory]', 'Directory to initialize the framework in')
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
          type: 'list',
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
          type: 'list',
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

    const spinner = ora('Downloading framework template...').start();

    try {
      // Create a temporary directory
      const tempZip = path.join(targetPath, 'framework-temp.zip');
      const tempDir = path.join(targetPath, 'framework-temp');
      
      // Download using curl
      execSync(`curl -sL https://github.com/username/ai-company-framework/archive/refs/heads/main.zip -o "${tempZip}"`);
      
      spinner.text = 'Extracting files...';
      // Unzip using standard tools (windows: tar, mac/linux: unzip)
      if (process.platform === 'win32') {
        execSync(`tar -xf "${tempZip}" -C "${targetPath}"`);
      } else {
        execSync(`unzip -q "${tempZip}" -d "${targetPath}"`);
      }

      spinner.text = 'Configuring AI Rules...';
      const extractedFolder = path.join(targetPath, 'ai-company-framework-main', 'template', templateChoice, '.agents');
      
      // Move .agents to target root
      fs.cpSync(extractedFolder, path.join(targetPath, '.agents'), { recursive: true });
      
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

      spinner.text = 'Cleaning up...';
      fs.unlinkSync(tempZip);
      fs.rmSync(path.join(targetPath, 'ai-company-framework-main'), { recursive: true, force: true });

      spinner.succeed(chalk.green('Framework initialized successfully!'));
      
      console.log('\nNext steps:');
      console.log(chalk.cyan(`  cd ${targetDir}`));
      console.log(chalk.cyan(`  Open this folder in Cursor, VSCode, or Windsurf`));
      console.log(chalk.cyan(`  Type "hello" in the AI Chat to start the Founder Interview!\n`));

    } catch (error) {
      spinner.fail(chalk.red('Failed to initialize framework.'));
      console.error(error);
    }
  });

program.parse(process.argv);
