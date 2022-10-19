# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??
- ❓ Après insert, récup ID coop & user


# DEV ROADMAP
o Page Events
	o renommer compo en events-list + class en EventsList + modifier partout ...
	o Récupérer le User à partir de l'ID de la session (ou de l'observable du service, plutot ^_^) et check si l'ID n'est pas à 0
	o Développer inscription à un event !
		- voir si le user n'est pas déjà inscrit à l'event ! si oui, ne pas mettre le bouton mais un message à la place)
	🙏 Carte sur evenements
		🙏 trajet avec coordo GPS user ?

o Lister la batterie de tests à faire
	o Tester l'app en entier et préparer la démo

o Clean code (everywhere, html, css, ts, modules, routes, ...):
	o comments: 
		o check TODOs, DEBUG (laisser les todos pertinents!)
		o delete commented code and unnecessary comments
	o debug elements
		o check debug elements dans interface
		o check console.logs
		o check alerts
	o check imports (unused, order)

o git: update Readme

o Update Présentation


# Leaflet Setup
https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet


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
