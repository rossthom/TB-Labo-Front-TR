# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??
- ❓ Après insert, récup ID coop & user
- ⚠️❓ Guard Deactivate freeze mon app


# DEV ROADMAP
o Routes & Guards: 
	- Changer nom route 'coop' en 'events'
	- Faire une route 'login' avec /login/coop et /login/user
		- 🐛 Guard 'désactivate' (ne fonctionne pas, freeze mon app) 
		o Une fois connecté en tant que User, bloquer la route vers User Login aussi
		o Une fois connecté en tant que Coop, bloquer la route vers Coop Login aussi

o Modifier UserAuth et CoopAuth pour n'avoir que l'ID en session, et non un binome redondant 'isConnected' et 'ID'

o Page 'Vue Coop', changer en Vue Events (pour les users)
	- afficher liste events
	- Bouton 'détail event', affiche détail coop + event
	o Récupérer le User à partir de l'ID de la session (ou de l'observable du service, plutot ^_^) et check si l'ID n'est pas à 0
	o Développer inscription à un event !
		- voir si le user n'est pas déjà inscrit à l'event ! si oui, ne pas mettre le bouton mais un message à la place)
	🙏 Carte sur evenements
		🙏 trajet avec coordo GPS user ?
	🙏 Nom 'coop-view' et route 'coop' ne sont plus très parlants...

o git: update Readme

o Liste de tests à faire

o Clean code (everywhere, html, css, ts, modules, routes, ...):
	o check TODOs, DEBUG
	o check imports (unused, order)
	o check debug elements dans interface
	o check console.log
	o check alerts
	o delete commented code and unnecessary comments

o Présentation !! aux mots en anglais !!


# PROJECT INIT: 
- Start new project with sakai skeleton
- move Sakai demo to documentation
	- build project
- create 'NotFound' on 'shared'
- initialize routing to 'Home' and 'NotFound'

- Change index.html title

- link to github
	- first commit
	- create dev branch, commit

======================================================

# Git Workflow
`git checkout -b dev`
then push on github

	`git checkout -b myFeature`
	then push on github

	... dev ...

	`git checkout dev`		// going back on 'dev'
	`git merge myFeature` 	// merge 'myFeature' on 'dev' (I need to be on 'dev' branch)

... test...

`git checkout main` 		// going back on 'main'
`git merge dev` 			// merge 'dev' on 'main' (I need to be on 'main')
