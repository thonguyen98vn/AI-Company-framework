import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const agentsDir = path.join(rootDir, 'template', 'full', '.agents');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

try {
  console.log('Generating llms-full.txt with UTF-8 encoding...');
  const mdFiles = getAllFiles(agentsDir);
  
  let llmsFullContent = `# AI Company Framework - Full Context (llms-full.txt)
This file concatenates all markdown files from the full template to provide complete context for LLMs.

`;

  for (const file of mdFiles) {
    const relativePath = path.relative(rootDir, file);
    const content = fs.readFileSync(file, 'utf8');
    llmsFullContent += `\n\n================================================================================\n`;
    llmsFullContent += `FILE: ${relativePath.replace(/\\/g, '/')}\n`;
    llmsFullContent += `================================================================================\n\n`;
    llmsFullContent += content;
  }

  const outPath = path.join(rootDir, 'llms-full.txt');
  fs.writeFileSync(outPath, llmsFullContent, 'utf8');
  console.log('✅ Generated llms-full.txt successfully.');

  console.log('Generating llms.txt...');
  // Read current llms.txt or generate a default one
  const llmsPath = path.join(rootDir, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    // Just ensure it's saved as utf8
    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    fs.writeFileSync(llmsPath, llmsContent, 'utf8');
    console.log('✅ Verified llms.txt encoding.');
  }

} catch (err) {
  console.error('Error generating llms files:', err);
  process.exit(1);
}
