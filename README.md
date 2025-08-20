# Family Tree
A CLI family tree project to practice algorithms and data structures.

## Features
* Insert and update individuals
* Create parent-to-child and spouse-spouse relationships
* Display the family tree
* Inquirer-based CLI with validated inputs
* Case-insensitive index by name search

## Installation
```
git clone 
cd family_tree
npm install
```

## Setup
### Prerequisites
1. Node.js
    1. Ensure `node` and `npm` are available in the command line.

## Run locally
```
npm start
```

## Future Development

1. I would like to introduce a guard to prevent impossible relationships, e.g. child-grandparent relationship.
2. Need to investigate possible bug in `verifyBirthdate` while using `toISOString()` which may shift the date depending what time of day it is entered.

### Reflection notes

* The biggest challenge was reindexing the name when someone updated their name
* The complexity grew quickly and I had to scale back some ideas to complete in time. E.g. dates are currently stored as text, but I wanted to check whether a child's birthdate was greater than the parent's before assigning a parent-child relationship.
* Adding `inquirer` added interactivity to the program and highlighted several bugs to resolve, especially input validation.
