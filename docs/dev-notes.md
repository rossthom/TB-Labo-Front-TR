# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??

- ⚠️❓ Comment modifier mon objet juste avant de faire l'update en DB ?
- ⚠️❓ Creation nouvelle Coop ou User: vérifier si email pas déjà donné... (Camille)


# DEV ROADMAP
- CRU Coopératives & Events:
	👷 faire fonctionner Nominatim lors de :
		- update Coop
		- update Evenement
		- insert Evenement
		- insert Coop

	o Test Créer Coop
		⚠️ check si email n'existe pas déjà !!!
		o rajouter un toast
	o Test Update Coop
		o rajouter un toast
	o Test Créer Event
		o rajouter un toast
	o Test Update Event
		o rajouter un toast

	o Clean PTV labels dans Forms CCoop, UCoop, CRUEvent
	o Clean test button and methods from CCoop, UCoop, CRUEvent

o Développer Connection Cooperative
	- Form avec email et mot de passe (page login Sakai)
	o coopAuthService: login() => check si email+mpd est OK
	o gérer statut de login, rediriger vers la page de la Coop (gest-coop:id) 
		o => refaire cette page en enlevant la liste de coops
			🙏 NTH: child for event list
		o Coop logout: ajouter un bouton déconnection sur cette page
	o Guard sur Gest. Coop. routes
	🙏 gérer 'remember me' (local storage)
	o Guard désactiver vue recherche évènement quand Coop connectée

o Développer Registration User
	o créer compo user-crea avec formulaire de création
		o validateurs !
		⚠️ check si email n'existe pas déjà !!!
		⚠️ make Nominatim work (adresse nouvel utilisateur)
	o User login
		o créer compo user-login avec formulaire
			o validators !
	o Guard sur routes Vue Coop vues
	o User logout

o Développer inscription à un event !
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
