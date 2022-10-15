# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??
- ❓ form .group() deprecated avec les options qu'on lui donne...

- ⚠️❓ Comment modifier mon objet juste avant de faire l'update en DB ?
- ⚠️❓ Construction formulaire avec options: méthode dépréciée !


# DEV ROADMAP
- CRU Coopératives & Events:
	👷 Page CREER Coop
		- Ajouter email & pwd (+ confirm pwd)
		- valid email
		- valid pwd (valid globale)

	o Sur TOUS les form (CCoop, UCoop, CEvent, UEvent), tester les Validateurs
		🐛 Vérifier les erreurs de validation. 
			- Il semble que NominatimValidator ne se trigger pas dans NewEvent
			- Bien tester tous les messages...

	👷 faire fonctionner Nominatim lors de :
		- update Coop
		- update Evenement
		- insert Evenement
		- insert Coop

	o Test Créer Event
	o Test Update Coop
	o Test Créer Event
	o Test Update Event

	o Clean test button and methods from CCoop, UCoop, CRUEvent

	🙏 NTH: child for event list
	
o Développer Connection Cooperative
	o Guard sur Gest. Coop. routes

o Développer Registration User
	o ⚠️ make Nominatim work (adresse nouvel utilisateur)
	o Clean PTV screens from NewUser
	o Clean test button and methods from NewUser
	o Guard sur routes Vue Coop vues
	o User login
	o User logout

o Développer inscription à un event
	o BONUS... Dans event list, voir combien de personnes sont inscrites...

o Développer vues events et coop quand user connecté
	o Carte ?
	o Calendrier ?

o Clean code (everywhere, html, css, ts, modules, routes, ...):
	o check TODOs
	o check debug elements dans interface
	o check console.log
	o delete commented code


# ARCHITECTURE
- module gestCoop
	- services
		- gestCoopService
			- get CoopTypes
			- CRUD Coop
		- gestEventService
			- get EventTypes
			- CRUD Events
		- nominatimService
			- get data from address
	- models
		- Coop
		- Events
	- compos
		- ...

- in app-modules:
	- services
		- usersService
			- CRUD users
	- home: 
		- connect as coop
			- unlock gest coop routes
		- connect as user


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
