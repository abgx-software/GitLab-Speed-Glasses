#! /usr/bin/env node
/*

________                 _________   ______________                                 
__  ___/_______________________  /   __  ____/__  /_____ ___________________________
_____ \___  __ \  _ \  _ \  __  /    _  / __ __  /_  __ `/_  ___/_  ___/  _ \_  ___/
____/ /__  /_/ /  __/  __/ /_/ /     / /_/ / _  / / /_/ /_(__  )_(__  )/  __/(__  ) 
/____/ _  .___/\___/\___/\__,_/      \____/  /_/  \__,_/ /____/ /____/ \___//____/  
       /_/                                                                           

*/

const colorBlack = '\x1b[30m';
const colorRed = '\x1b[31m';
const colorGreen = '\x1b[32m';
const colorBlue = '\x1b[34m';
const colorYellow = '\x1b[33m';
const colorWhite = '\x1b[37m';
const bgBlack = '\x1b[40m';
const bgWhite = '\x1b[47m';
const colorExt = '%s';
const colorStop = '\x1b[0m';

/*
const colorBlack = '#183A37';
const colorRed = '#C1292E';
const colorGreen = '#47A025';
const colorYellow = '#EEBA0B';
*/

const speedGlasses = '________                 _________   ______________\n__  ___/_______________________  /   __  ____/__  /_____ ___________________________\n_____ \\___  __ \\  _ \\  _ \\  __  /    _  / __ __  /_  __ `/_  ___/_  ___/  _ \\_  ___/\n____/ /__  /_/ /  __/  __/ /_/ /     / /_/ / _  / / /_/ /_(__  )_(__  )/  __/(__  ) \n/____/ _  .___/\\___/\\___/\\__,_/      \\____/  /_/  \\__,_/ /____/ /____/ \\___//____/  \n       /_/                                                                           ';
//const coloredSpeedGlasses = '%c________                 _________   ' + '%c______________' + '\n%c__  ___/_______________________  /   ' + '%c__  ____/__  /_____ ___________________________' + '\n%c_____ \\___  __ \\  _ \\  _ \\  __  /    ' + '%c_  / __ __  /_  __ `/_  ___/_  ___/  _ \\_  ___/' + '\n%c____/ /__  /_/ /  __/  __/ /_/ /     ' + '%c/ /_/ / _  / / /_/ /_(__  )_(__  )/  __/(__  ) ' + '\n%c/____/ _  .___/\\___/\\___/\\__,_/      ' + '%c\\____/  /_/  \\__,_/ /____/ /____/ \\___//____/  ' + '\n%c       /_/';

const coloredSpeedGlassesArray = [
    [
        '  ________                 _________   ',
        '______________                                  '
    ],
    [
        '  __  ___/_______________________  /   ',
        '__  ____/__  /_____ ___________________________ '
    ],
    [
        '  _____ \\___  __ \\  _ \\  _ \\  __  /    ',
        '_  / __ __  /_  __ `/_  ___/_  ___/  _ \\_  ___/ '
    ],
    [
        '  ____/ /__  /_/ /  __/  __/ /_/ /     ',
        '/ /_/ / _  / / /_/ /_(__  )_(__  )/  __/(__  )  '
    ],
    [
        '  /____/ _  .___/\\___/\\___/\\__,_/      ',
        '\\____/  /_/  \\__,_/ /____/ /____/ \\___//____/   '
    ],
    [
        '         /_/                           ',
        '                                                '
    ],
    [
        '                                       ',
        '                                                '
    ]
];

function printSpeedGlasses() {
    coloredSpeedGlassesArray.forEach(function(line) {
        console.log(bgBlack+colorWhite+colorExt, line[0], bgBlack+colorRed, line[1], colorStop);
    });
}

const smallGlasses = '(⌐■_■)';
function printSCG() {
    console.log(bgBlack+colorExt, '           ',colorStop);
    console.log(bgBlack+colorRed+colorExt, '  (⌐■ _■ ) ',colorStop);
    console.log(bgBlack+colorExt, '           ',colorStop);
}

var nconf = require('nconf');

const { exec, execSync } = require('child_process');

nconf.use('file', { file: './glsg-config.json' });
nconf.load();
var data = nconf.get('main_config');
var labelConfig = nconf.get('labels_config');
var commandsConfig = nconf.get('commands_config');

var XMLHttpRequest = require('xhr2');

const readlineSync = require('readline-sync');

let Utils = {
    'conf': nconf,
    'speedGlasses': printSpeedGlasses,
    'smallSpeedGlasses': printSCG,
    'data': data,
    'labelConfig': labelConfig,
    'commandsConfig': commandsConfig,
    'XMLHttpRequest': XMLHttpRequest,
    'readlineSync': readlineSync,
    'cBlack': colorBlack,
    'colorRed': colorRed,
    'colorYellow': colorYellow,
    'colorGreen': colorGreen,
    'colorBlue': colorBlue,
    'colorWhite': colorWhite,
    'colorExt': colorExt,
    'colorStop': colorStop,
    'exec': exec,
    'execSync': execSync,
}

module.exports = Utils;