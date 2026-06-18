import { spawnSync } from 'child_process';
import path from 'path';

const testDir = path.join(process.cwd(), 'user-test-dir');

const child = spawnSync('node', ['../cli/bin/create-ai-company.js', '.'], {
  cwd: testDir,
  input: '\n',
  encoding: 'utf-8'
});

console.log('STATUS:', child.status);
console.log('STDOUT:\n', child.stdout);
console.log('STDERR:\n', child.stderr);
