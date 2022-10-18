# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??

- ❓ Comment modifier mon objet juste avant de faire l'update en DB ?
- ⚠️❓ Dans mon module GestCoop, j'ai un lien vers mon validateur checkemail présent dans mon module principal
- ⚠️❓ Guard Deactivate freeze mon app


# DEV ROADMAP
o Connection Cooperative
	- 🐛 Guard 'désactivate' (ne fonctionne pas, freeze mon app) 

- CRU Coops, Event, Users
	o faire fonctionner Nominatim lors de :
		- Create Coop
			o Test Créer Coop
		✔️ Update Coop
			✔️ Test Update Coop
		- Create Evenement
			o Test Créer Event
		- Update Evenement
			o Test Update Event
		- Create User
			o Test Créer User

	o Clean PTV labels dans Forms CCoop, UCoop, CRUEvent, CUser
	o Clean test button and methods from CCoop, UCoop, CRUEvent, CUser

o Page 'Vue Coop', changer en Vue Events (pour les users)
	- afficher liste events
	- Bouton 'détail event', affiche détail coop + event
	o Développer inscription à un event !
		- voir si le user n'est pas déjà inscrit à l'event ! si oui, ne pas mettre le bouton mais un message à la place)
	🙏 Carte sur evenements
		🙏 trajet avec coordo GPS user ?
	🙏 Nom 'coop-view' et route 'coop' ne sont plus très parlants...

o ⚠️ MODULES !!!
	o Dans mon module GestCoop, j'ai un lien vers mon validateur checkemail présent dans mon module principal
	o J'ai tout mon coop-login dans 'project' au lieu de 'gest-coop'
	o Virer module project pour le mettre à la racine (app)

o Clean code (everywhere, html, css, ts, modules, routes, ...):
	o check TODOs
	o check debug elements dans interface
	o check console.log
	o check alerts
	o delete commented code and unnecessary comments


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
