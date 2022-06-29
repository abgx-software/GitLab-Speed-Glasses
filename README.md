    ________                 _________    ______________                                 
     __  ___/_______________________  /   __  ____/__  /_____  ___________________________
     _____ \___  __ \  _ \  _ \  __  /    _  / __ __  /_  __ `/_   ___/_  ___/  _ \_  ___/
     ____/ /__  /_/ /  __/  __/ /_/ /     / /_/ / _  / / /_/ /_(__  ) _(__  )/  __/(__  ) 
     /____/ _  .___/\___/\___/\__,_/      \____/  /_/  \__,_/ /____/  /____/ \___//____/  
            /_/

# Please put on your ***Speed Glasses*** ⌐■_■
This project is about removing and adding really fast some tickets on Issues and Merge Request at the same time in one command.
 - Easy to install
 - Easy to understand and use
 - Very close to lightspeed

# Usage
Access the main menu and choose the command you want to execute by running
```bash
 $ glsg
```

# Installation
Download this project and use it as you want.

If you want to work with ***SG*** on a single project :

> This installation require root access for executing ***SG*** everywhere, you can also follow Next Step for a no-root deployment.

 1. Put SG in your Workspace
 2. Open Terminal and run
```bash
 $ npm install -g
```
or
```bash
 $ sudo npm install -g
```

 3. You can now run ``glsgsetconfig`` for accessing the configuration menu, you will have to fill these informations with one of your project's informations.

# Configuration
```bash
 $ glsgsetconfig
```
Paste your project's API token, then go to your project's gitlab repository and take the projects full URL then send it to ***SG***.

> Don't forget to add `glsg-config.json` to your `.gitignore` file because this configuration works only for your machine

For the last configuration element, run ``pwd`` in a terminal runned in your project's directory and send it to ***SG***.
> You can edit the config.json file manually too
```bash
 $ glsgsetconfig
```

If you need a config reset run
> This command will not delete your tickets config
```bash
 $ glsgresetconfig
```

Example configuration for `config.json` :
```bash
{
 "main_config":  {
  "gitDirectory":"https://gitlab.speedglasses.fr",
  "gitProjectURL":"https://gitlab.speedglasses.fr/speed/glasses",
  "gitProjectName":"/speed/glasses",
  "projectDirectory":"/home/your_username/Workspace/speed/glasses",
  "access_token":"YOUR_PROJECT_ACCESS_TOKEN",
  "projectuuid":2
 },
 "labels_config":  {
  "issue"  :  [
   "Tickets that concerns Issues Only",
   "Done"
  ],
  "merge_request"  :  [
   "Tickets that concerns Merge Requests Only",
   "To test"
  ]
 },
 "commands_config":  [
  {
   "command":  "Your command Name",
   "add":  [
	"Labels to add"
   ],
   "remove":  [
	"Labels",
	"To",
	"Remove"
   ]
  },
  {
   "command":  "To Test",
   "add":  [
	"To test",
	"Done"
   ],
   "remove":  [
	"Doing"
   ]
  }
 ]
}
```

