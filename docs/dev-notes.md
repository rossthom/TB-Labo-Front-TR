# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??

- ⚠️❓ Comment modifier mon objet juste avant de faire l'update en DB ?
- ⚠️❓ Construction formulaire avec options: méthode dépréciée !


# DEV ROADMAP
- CRU Coopératives:
	o Validateurs
		🐛 Vérifier les erreurs de validation. 
			- Il semble que NominatimValidator ne se trigger pas dans NewEvent
			- Bien tester tous les messages...

	o Vue Coop:
		👷 Implémenter update Coop
			⚠️ make Nominatim work (adresse update coop)
			o Test Update Coop

		👷 Implémenter UPDATE Evenement
			⚠️ make Nominatim work (adresse update evenement)
			o Test Update Evenement

		👷 Implémenter CREATE event
			⚠️ make Nominatim work (adresse nouvel evenement)
			o Test Create Evenement

	👷 Développer page CREER Coop
		⚠️ make Nominatim work  (adresse nouvelle coop)
		o Test Create Coop

	🙏 NTH: child for event list
	
	o Clean test button and methods from NewCoop

o Développer Connection Cooperative
	o Guard sur Gest. Coop. routes

o Développer Registration User
	o ⚠️ make Nominatim work (adresse nouvel utilisateur)
	o Clean PTV screens from NewCoop
	o Clean test button and methods from NewCoop
	o Guard sur Coop vues routes
	o User login
	o User logout

o Développer vues events et coop quand user connecté
	o Carte ?
	o Calendrier ?

o Développer inscription à un event
	o BONUS... Dans event list, voir combien de personnes sont inscrites...

o Cleanup
	o Delete all test components, delete routes, ...


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
