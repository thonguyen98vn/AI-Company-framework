import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

try {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-company-'));
  console.log("tempDir", tempDir);
  const tempZip = path.join(tempDir, 'main.zip');
  console.log("tempZip", tempZip);
  
  execSync(`curl -sL https://github.com/thonguyen98vn/AI-Company-framework/archive/refs/heads/main.zip -o "${tempZip}"`);
  console.log("downloaded");
  
  execSync(`tar -xf "${tempZip}" -C "${tempDir}"`);
  console.log("extracted");
  
  const extractedFolder = path.join(tempDir, 'AI-Company-framework-main', 'template', 'minimal', '.agents');
  console.log("extractedFolder", extractedFolder);
  
  const targetPath = path.resolve(process.cwd(), 'test-proj');
  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);
  
  fs.cpSync(extractedFolder, path.join(targetPath, '.agents'), { recursive: true });
  console.log("copied");
  
} catch(e) {
  console.error("ERROR", e);
}
