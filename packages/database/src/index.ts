import { exec } from 'child_process';

const startDatabase = () => {
  exec('docker-compose up -d', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting database: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Database stderr: ${stderr}`);
      return;
    }
    console.log(`Database stdout: ${stdout}`);
  });
};

startDatabase();