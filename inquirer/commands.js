import { select } from "@inquirer/prompts";
import {
  promptsNewPerson,
  promptsDisplay,
  promptsAssociate,
  promptsSearch,
  promptsUpdate,
} from "./prompts.js";

export async function getCommand() {
  // Loop command prompts indefinitely until "Exit" is selected.
  while (true) {
    console.log(); // For spacing
    const answers = await select({
      message: "Select a task:",
      choices: [
        {
          name: "Add",
          value: "add",
          description: "Add an individual to the database.",
        },
        {
          name: "Display",
          value: "display",
          description: "Display a family tree.",
        },
        {
          name: "Relationship",
          value: "relationship",
          description: "Define a new relationship.",
        },
        {
          name: "Search by Name",
          value: "search",
          description: "Find an ID by name.",
        },
        {
          name: "Update",
          value: "update",
          description: "Update the details of an individual.",
        },
        {
          name: "Exit",
          value: "exit",
          description: "Close program.",
        },
      ],
    });

    // Close program if "Exit" selected
    if (answers === "exit") {
      break;
    }

    switch (answers) {
      case "add":
        await promptsNewPerson();
        break;
      case "display":
        await promptsDisplay();
        break;
      case "relationship":
        await promptsAssociate();
        break;
      case "search":
        await promptsSearch();
        break;
      case "update":
        await promptsUpdate();
        break;
    }
  }
}
