import inquirer from "inquirer";
import { select } from "@inquirer/prompts";
import { familyTree } from "../data/init.js";
import { maximumId } from "../functions/functions.js";

export async function promptsNewPerson() {
  // Prompts to add a new individual
  const name = await inquirer.prompt([
    {
      type: "input",
      name: "personName",
      message: "Enter name of new record:",
      validate: (input) => {
        return isValidName(input);
      },
    },
  ]);

  const dob = await inquirer.prompt([
    {
      type: "input",
      name: "personDob",
      message: "Enter date of birth in YYYY-MM-DD format:",
      validate: (input) => {
        return isValidDateString(input.trim());
      },
    },
  ]);

  const newId = maximumId(familyTree.nodes) + 1;
  const birthdate = verifyBirthdate(dob.personDob);

  try {
    familyTree.addPerson({
      id: Number(newId),
      name: name.personName,
      birthdate: birthdate,
    });
    console.log(
      `${name.personName} with ID ${newId} has successfully been inserted.`
    );
  } catch (error) {
    console.log(`Error: Unable to add new person.`);
  }
}

export async function promptsDisplay() {
  // Prompts to display the family tree
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "ID of family tree to display:",
      validate: (input) => {
        return isNumericId(input);
      },
    },
  ]);
  const id = Number(answers.id.trim());
  familyTree.outputFamilyOf(id);
}

export async function promptsSearch() {
  // Prompts to find the ID of a person
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Search name:",
    },
  ]);
  console.log();
  console.log(`---------- Search Results ----------`);
  familyTree.searchByName(answers.name.trim());
  console.log(`------------------------------------`);
  console.log();
}

export async function promptsUpdate() {
  let answers;
  answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "ID of person to update:",
      validate: (input) => {
        return isNumericId(input);
      },
    },
  ]);
  const personId = Number(answers.id.trim());

  answers = await select({
    message: "Which details would you like to update?",
    choices: [
      {
        name: "Name",
        value: "name",
        description: "Update individual's name.",
      },
      {
        name: "Date of birth",
        value: "birthdate",
        description: "Update date of birth.",
      },
    ],
  });
  const updateType = answers;

  switch (updateType) {
    case "name":
      answers = await inquirer.prompt([
        {
          type: "input",
          name: "keyValue",
          message: "New value:",
        },
      ]);
      const newInfo = answers.keyValue;
      familyTree.updateName(personId, newInfo);
      break;
    case "birthdate":
      answers = await inquirer.prompt([
        {
          type: "input",
          name: "birthdate",
          message: "Enter updated birthdate in YYYY-MM-DD format:",
          validate: (input) => {
            return isValidDateString(input.trim());
          },
        },
      ]);
      const newBirthdate = verifyBirthdate(answers.birthdate);
      familyTree.updateBirthdate(personId, newBirthdate);
      break;
  }
}

export async function promptsAssociate() {
  let answers;

  answers = await select({
    message: "Select an associate option:",
    choices: [
      {
        name: "Parent <--> Child",
        value: "pc",
        description: "Define the relationship between a parent and child.",
      },
      {
        name: "Spouse <--> Spouse",
        value: "spouse",
        description: "Define the relationship between two spouses.",
      },
      {
        name: "Spouse x--x Spouse",
        value: "detach",
        description: "Remove a spouse relationship.",
      },
    ],
  });

  switch (answers) {
    case "pc":
      answers = await inquirer.prompt([
        {
          type: "input",
          name: "parentId",
          message: "Enter the ID of the parent:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
        {
          type: "input",
          name: "childId",
          message: "Enter the ID of the child:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
      ]);
      const parentId = Number(answers.parentId.trim());
      const childId = Number(answers.childId.trim());
      const associateAll = await select({
        message: `Would you like to associate this child with all current spouses of ID: ${parentId}?`,
        choices: [
          {
            name: "Yes",
            value: "y",
          },
          {
            name: "No",
            value: "n",
          },
        ],
      });
      familyTree.associateChild(parentId, childId, associateAll);
      break;
    case "spouse":
      answers = await inquirer.prompt([
        {
          type: "input",
          name: "spouse1Id",
          message: "Enter the ID of spouse 1:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
        {
          type: "input",
          name: "spouse2Id",
          message: "Enter the ID of spouse 2:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
      ]);
      familyTree.associateSpouse(
        Number(answers.spouse1Id.trim()),
        Number(answers.spouse2Id.trim())
      );
      break;
    case "detach":
      answers = await inquirer.prompt([
        {
          type: "input",
          name: "spouse1Id",
          message: "Enter the ID of spouse 1:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
        {
          type: "input",
          name: "spouse2Id",
          message: "Enter the ID of spouse 2:",
          validate: (input) => {
            return isNumericId(input);
          },
        },
      ]);
      familyTree.detachSpouse([
        Number(answers.spouse1Id.trim()),
        Number(answers.spouse2Id.trim()),
      ]);
      break;
  }
}

function isValidName(name) {
  if (!name.trim()) return false;
  return true;
}

function isValidDateString(birthdate) {
  if (typeof birthdate !== "string") return false;

  // Check strict format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
    return false;
  }

  return true;
}

function verifyBirthdate(birthdate) {
  // Converts YYYY-MM-DD string to date, converts errors such as 2025-02-29 to 2025-03-01,
  // outputs corrected date as string
  const [year, month, day] = birthdate.split("-").map(Number);
  const date = new Date(year, Number(month) - 1, day);
  const newOutput = date.toISOString().slice(0, 10);
  return newOutput;
}

function isNumericId(id) {
  const s = String(id).trim();
  return /^\d+$/.test(s); // only 0–9, no signs/decimals/exponents
}
