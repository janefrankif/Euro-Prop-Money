#!/usr/bin/env node
const { spawn } = require('child_process');

// Parse and normalize CLI arguments from npm run dev -- ...
const rawArgs = process.argv.slice(2);
const cleanedArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    // Next.js CLI expects -H or --hostname, not --host
    cleanedArgs.push('-H');
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      cleanedArgs.push(rawArgs[i + 1]);
      i++;
    } else {
      cleanedArgs.push('0.0.0.0');
    }
  } else if (arg.startsWith('--host=')) {
    cleanedArgs.push('-H', arg.slice(7));
  } else {
    cleanedArgs.push(arg);
  }
}

// Ensure default port 3000 if not specified
if (!cleanedArgs.includes('-p') && !cleanedArgs.includes('--port')) {
  cleanedArgs.push('-p', process.env.PORT || '3000');
}

const child = spawn('npx', ['next', 'dev', ...cleanedArgs], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start Next.js dev server:', err);
  process.exit(1);
});
