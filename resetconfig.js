#! /usr/bin/env node

const u = require('./utils.js');

u.conf.set('main_config:gitDirectory', '');
u.conf.set('main_config:gitProjectURL', '');
u.conf.set('main_config:projectDirectory', '');
u.conf.set('main_config:projectuuid', null);
u.conf.set('main_config:access_token', '');
u.conf.set('main_config:gitProjectName', '');

u.conf.save(function (err) {
    if (err) {
        console.error(u.colorRed+u.colorExt, err.message, u.colorStop);
        return;
    }
    console.log(u.colorGreen+u.colorExt, 'config.json ~> reset', u.colorStop);
});
