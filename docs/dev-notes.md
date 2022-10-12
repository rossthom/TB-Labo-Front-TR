# INIT: 
- Start new project with sakai skeleton
- move Sakai demo to documentation
	- build project
- create 'NotFound' on 'shared'
- initialize routing to 'Home' and 'NotFound'

- Change index.html title

- link to github
	- first commit
	- create dev branch, commit

# NOTES:
json-server command:
`json-server --watch .\json-server\data.json --port 3000`


# ARCHITECTURE
- module gestCoop
	services/gestCoopService
		- CRUD Coop
		- CRUD Events
		- CRUD CoopTypes
		- CRUD EventTypes
	models/
		- Coop
		- Events
	compos/
		- ...

- in app-modules:
	- gest users.
	- home: 
		- connect as coop
			- unlock gest coop routes
		- connect as user


# TODO:
o Start GestCoop module
	o Develop Cooperatives detail view
	o Develop Events detail view
	o Develop Cooperative CRUD
	o Develop Events CRUD
o Manage Coop. login
	o Guard on Coop Gest. routes

o Develop user detail view
o Develop User CRUD
o Manage User login
o Manage user logout


# Errors
## Auth module (on sandbox project)
Can't bind to 'formGroup' since it isn't a known property of 'form'


======================================================

# Git Workflow
`git checkout -b dev`
then push on github

	`git checkout -b myFeature`
	then push on github

	... dev ...

	`git checkout dev`		// going back on 'main'
	`git merge myFeature` 	// merge 'myFeature' on 'dev' (I need to be on 'dev' branch)

... test...

`git checkout main` 		// going back on 'main'
`git merge dev` 			// merge 'dev' on 'main' (I need to be on 'main')
