# NOTES:
build:
npm i --legacy-peer-deps

json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??


# DEV ROADMAP
o Réessayer la carte des events? (sans mettre le bouton dans la table, peut etre c'est ça qui mettait la schtouille)

o Lister la batterie de tests à faire
	o Tester l'app en entier et préparer la démo

o Clean code (everywhere, html, css, ts, modules, routes, ...):
	o Clean json.data, json.full.data, json.pristine.data
	o CSS: rapatrier mon CSS à un endroit
	o comments:
		o check TODOs, DEBUG (laisser les todos pertinents!)
		o delete commented code and unnecessary comments
	o debug elements
		o check debug elements dans interface
		o check console.logs
		o check alerts
	o check imports (unused, order)

o git: update Readme
	- mention de la présentation PDF dans docs

o Update Présentation
	o mettre le PDF dans docs/PROJET/


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
