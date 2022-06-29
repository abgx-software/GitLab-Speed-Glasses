#! /usr/bin/env node

const u = require('./utils.js');

u.speedGlasses();
console.log('\nWelcome to GitLab Speed Glasses, before anything here, a little bit of config');
console.log("If you want to reset something in the config file, edit it manually or run 'glsginit' and follow the process");

var token = u.readlineSync.question("\nAPI's Access Token : ", false);
u.conf.set('main_config:access_token', token);

var giturl = u.readlineSync.question("\nURL of the GitLab project's directory : ", false);
var gitURL = new URL(giturl);
u.conf.set('main_config:gitDirectory', gitURL.origin);
u.conf.set('main_config:gitProjectURL', giturl);
u.conf.set('main_config:gitProjectName', gitURL.pathname);

const xhttp = new u.XMLHttpRequest();
xhttp.onload = function() {
    u.conf.set('main_config:projectuuid', JSON.parse(this.response)[0].id);
    u.conf.save(function (err) {
        if (err) {
            console.error(u.colorRed+u.colorExt, err.message, u.colorStop);
            return;
        }
    });
}
xhttp.open('GET', u.conf.get('main_config:gitDirectory') + '/api/v4/projects', true);
xhttp.setRequestHeader('PRIVATE-TOKEN', u.conf.get('main_config:access_token'));
xhttp.send();

var path = u.readlineSync.question("\nAbsolute path to the project's directory : ", false);
u.conf.set('main_config:projectDirectory', path);

u.conf.save(function (err) {
    if (err) {
        console.error(u.colorRed+u.colorExt, err.message, u.colorStop);
        return;
    }
    console.log(u.colorGreen+u.colorExt, 'config.json ~> Done.', u.colorStop);
    console.log("\nNow please run : 'glsg' and have fun !");
});

console.log(`\nGitLab Project's URL => ${giturl}`);
console.log(`Project's Directory Path => ${path}`);
