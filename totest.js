#! /usr/bin/env node
const u = require('./utils.js');

if(u.data.gitProjectURL == '' || u.data.projectuuid == null || u.data.projectDirectory == '') {
  exec('glsgsetconfig');
}

u.speedGlasses();
u.startGitManaging(['To test', 'Done'], ['Doing', 'StandBy']);

/*
readlineSync.on('close', function () {
  process.exit(0);
});
*/


