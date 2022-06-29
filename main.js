#! /usr/bin/env node
const u = require('./utils.js');

if(u.data.gitProjectURL == '' || u.data.projectuuid == null || u.data.projectDirectory == '') {
  u.exec('glsgsetconfig');
}

u.speedGlasses();

let commandIndex = 0;
let choiceCommandTab = [];
u.commandsConfig.forEach(command => {
  choiceCommandTab.push(command.command);
});
commandIndex = u.readlineSync.keyInSelect(choiceCommandTab, 'Which command do you want to execute ?');

if(commandIndex == -1) {
  console.log(u.colorRed+u.colorExt, 'Cancelled.', u.colorStop);
  process.exit(0);
} else {
  console.log('\n> ' + u.commandsConfig[commandIndex].command);
  startGitManaging(u.commandsConfig[commandIndex].add, u.commandsConfig[commandIndex].remove);
    
}

function startGitManaging(addLabels, remLabels) {
  process.chdir(u.data.projectDirectory);
  u.exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
    if (error) {
        console.log(`error : ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`error : ${stderr}`);
        return;
    }

    console.log('\n> ' + stdout);
    (async () => {
        const mrRequest = new u.XMLHttpRequest();
        var mergeRequests = await new Promise(resolve => {
        mrRequest.onload = function() {
            resolve(JSON.parse(this.response));
        }
        mrRequest.open('GET', u.data.gitDirectory + '/api/v4/projects/' + u.data.projectuuid + '/merge_requests?source_branch=' + stdout, true);
        mrRequest.setRequestHeader('PRIVATE-TOKEN', u.data.access_token);
        mrRequest.send();
        });
        let index = 0;
        if(mergeRequests.length > 1) {
            let choiceMRTab = [];
            mergeRequests.forEach(mr => {
                choiceMRTab.push('[' + mr.id + '] - ' + mr.title);
            });
            console.log(u.colorYellow+u.colorExt, '[WARNING] - Multiple Merge Requests are linked to your branch, pick the correct one', u.colorStop);
            index = readlineSync.keyInSelect(choiceMRTab, 'Which Merge Request is the one ?');
        } else if(mergeRequests.length < 1) {
            console.log(u.colorRed+u.colorExt, '[ERROR] - No Merge Request linked to your branch', u.colorStop);
            return;
        }
        if(index == -1) {
            console.log(u.colorRed+u.colorExt, 'Cancelled.', u.colorStop);
            return;
        }
        //console.log('\n> [' + mergeRequests[index].iid + '] - ' + mergeRequests[index].title);
        var matchOnDesc = mergeRequests[index].description.match(/.*Closes #([0-9]+).*/);
        let issueIid = null;
        if( matchOnDesc != null ) {
            issueIid = matchOnDesc[1];
        } else {
            console.log(u.colorRed+u.colorExt, '[ERROR] - "Closes #0000" Not found in Merge Request description', u.colorStop);
            return;
        }

        const issueRequest = new u.XMLHttpRequest();
        var issue = await new Promise(resolve => {
        issueRequest.onload = function() {
            resolve(JSON.parse(this.response));
        }
        issueRequest.open('GET', u.data.gitDirectory + '/api/v4/projects/' + u.data.projectuuid + '/issues/' + issueIid, true);
        issueRequest.setRequestHeader('PRIVATE-TOKEN', u.data.access_token);
        issueRequest.send();
        });

        if(mergeRequests[index].title.match(/.*issue.title.*/)) {
            console.log(u.colorYellow+u.colorExt, "\n[WARNING] - Issue's title was not found in the Merge Request title, please check if the picked elements are the good ones.", u.colorStop);
        }
        
        console.log('\n[Issue] => ' + issue.title);
        console.log(u.colorBlue+u.colorExt, issue.web_url, u.colorStop);
        updateLabels(issue, addLabels, remLabels);
        
        console.log('\n\n[Merge Request] => ' + mergeRequests[index].title);
        console.log(u.colorBlue+u.colorExt, mergeRequests[index].web_url, u.colorStop);
        updateLabels(mergeRequests[index], addLabels, remLabels);
    })()
  });
}

function updateLabels(item, addLabels, remLabels) {
  if(item !== null) {
    let newLabels = item.labels.filter(x => !remLabels.includes(x)).filter(x => !addLabels.includes(x));
    addLabels.forEach(function(label){
      newLabels.push(label);
    });
    
    let urlArray = {
      'issue': '/issues/',
      'merge_request': '/merge_requests/'
    }
    let currentItem = u.data.gitDirectory + '/api/v4/projects/' + u.data.projectuuid;
    const tmpUrl = new URL(item.web_url);
    var actualLabels = [];
    if(tmpUrl.pathname.includes('/issues/')){
      actualLabels = newLabels.filter(x => !u.labelConfig.merge_request.includes(x));
      currentItem =  currentItem + urlArray['issue'];
    } else if(tmpUrl.pathname.includes('/merge_requests/')) {
      actualLabels = newLabels.filter(x => !u.labelConfig.issue.includes(x));
      currentItem = currentItem + urlArray['merge_request'];
    } else {
      console.log(u.colorRed+u.colorExt, '[ERROR] - Unknown element type when setting labels', u.colorStop);
      return;
    }

    console.log(' - ' + u.colorStop+u.colorRed+u.colorExt, item.labels.filter(x => !(newLabels.filter(y => !addLabels.includes(y))).includes(x)), u.colorStop);
    console.log('   ' + u.colorStop+u.colorWhite+u.colorExt, actualLabels.filter(x => !addLabels.includes(x)), u.colorStop);
    console.log(' + ' + u.colorStop+u.colorGreen+u.colorExt, actualLabels.filter(x => addLabels.includes(x)), u.colorStop);
    
    (async () => {
      const itemRequest = new u.XMLHttpRequest();
      var itemUpdated = await new Promise(resolve => {
        itemRequest.onload = function() {
          resolve(JSON.parse(this.response));
        }
        itemRequest.open('PUT', currentItem + item.iid, true);
        itemRequest.setRequestHeader('PRIVATE-TOKEN', u.data.access_token);
        itemRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        itemRequest.send(JSON.stringify({ "id": item.id, "iid": item.iid, "labels": actualLabels }));
      });

      if(itemUpdated.web_url == item.web_url) {
        console.log(u.colorGreen+u.colorExt, "\n[SUCCESS] - Update Successful.", u.colorStop);
      } else {
        console.log(u.colorYellow+u.colorExt, "\n[WARNING] - Command may have failed, check online manually on your Issue & Merge Request.", u.colorStop);
      }
      return;
    })();
  } else {
    console.log(u.colorRed+u.colorExt, '[ERROR] - Issue / Merge Request empty when setting labels', u.colorStop);
    return;
  }
}
