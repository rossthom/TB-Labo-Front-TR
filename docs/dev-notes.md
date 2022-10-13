# NOTES:
json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# WHAT NOW ?
- CRU Coopératives:
	- faire un compo de creation / update coop
	o JSON vide pour coops et events


# TODO GUIDELINE
o Start GestCoop module
	- Develop Cooperatives detail view
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
