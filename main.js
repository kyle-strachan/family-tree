import { getCommand } from "./inquirer/commands.js"
import { initDataLoad } from "./data/init.js";

// Load initial data
initDataLoad();

// Begin prompts for commands
getCommand();