const readline = require('readline');


exports.waitForConfirm = message => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`${message}`, (answer) => {
    if (answer === 'Y') resolve();
    else reject(new Error('Aborted by user'));

    rl.close();
  });
});
