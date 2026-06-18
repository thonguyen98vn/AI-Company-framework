import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const testDir = path.join(process.cwd(), 'user-test-dir');
if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
fs.mkdirSync(testDir);

console.log('--- STARTING USER TEST ---');
try {
  // We run the CLI and pipe a newline to select the default template (minimal)
  const output = execSync('node ../cli/bin/create-ai-company.js .', {
    cwd: testDir,
    input: '\n',
    encoding: 'utf-8'
  });
  console.log('CLI OUTPUT:\n', output);
} catch (e) {
  console.log('CLI FAILED WITH ERROR:', e.message);
  if (e.stdout) console.log('STDOUT:', e.stdout);
  if (e.stderr) console.log('STDERR:', e.stderr);
}

console.log('\n--- VERIFYING FILES ---');
const filesToCheck = ['.agents', '.cursorrules', 'AGENTS.md'];
let allPassed = true;

for (const file of filesToCheck) {
  const p = file === 'AGENTS.md' ? path.join(testDir, '.agents', file) : path.join(testDir, file);
  if (fs.existsSync(p)) {
    console.log(`✅ ${file} exists.`);
  } else {
    console.log(`❌ ${file} is MISSING!`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n✅ User Test PASSED: All files generated successfully.');
} else {
  console.log('\n❌ User Test FAILED.');
}
