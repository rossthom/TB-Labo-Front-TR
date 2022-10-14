# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??

# WHAT NOW ?
- CRU Coopératives:
	o voir page Sakai CRUD
		o voir comment faire une page de modification pour les coop, comme l'exemple sakai (avec popup)
		o faire la popup dans un children ? => comment refresh la page parente avec les nouvelles données ?
		- développer UPDATE Coop'
			o JSON: ajout email et password pour coop
			o Avoir un CoopView et un CoopDtoUpd, CoopDtoAdd
			o FormGroup
			o Validateurs: tester les validateurs de base
			o Address: créer un NominatimValidator
				o si l'adresse a changé, il faut rappeler nominatim. 
					o Si il y a un résultat, c'est OK et il faut l'enregistrer dans l'objet coop
					o Sinon, afficher message erreur au niveau du champ adresse.
			- Call update function from service

	- Vue Coop:
		- Bouton détail affiche détail d'un event en popup ?
		- Ce détail d'event est un child?
	- voir comment CREER et UPDATE evenement (pas Delete)
	- Développer page CREER Coop
	o JSON vide pour coops et events

- Développer Connection Cooperative

# TODO GUIDELINE
o Start GestCoop module
	o Develop Cooperatives detail view
	- Develop Events detail view
	o Develop Cooperative CRUD
	o Develop Events CRUD
o Create Coop & Events CRUD compos
o Create Coop & Events views compos 
o Manage Coop. login
	o Guard on Coop Gest. routes

o Develop user detail view
o Develop User CRUD
o Manage User login
o Manage user logout

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


# ERRORS
## Auth module (on sandbox project)
Can't bind to 'formGroup' since it isn't a known property of 'form'


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
