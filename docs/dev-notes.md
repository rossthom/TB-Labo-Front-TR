# NOTES:
build:
npm i --legacy-peer-deps

json-server start command:
`json-server --watch .\json-server\data.json --port 3000`


# QUESTIONS LOIC
- ❓ Serieux, comment déclarer une variable basée sur un objet sans utiliser ! ??


# DEV ROADMAP
o Code:
	o Coop Profile: retirer ID coop_type
	o Liste évènements: tri par date
		o EventList
		o User Profile

o Update Présentation
	o Mension que la logique métier est implémentée dans des services (dans section 'features angular')
	o "Ergonomie" au lieu d'"Accessibilité"

o README
	o Retirer mension présentation 


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
