export class PersonNode {
  constructor({ id, name, birthdate }) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    // this.details = details; // Was a 'nice to have', focussed on inquirer instead
    this.children = new Set(); // Maintains ids of children
    this.parents = new Set(); // Maintains ids of parents
    this.spouse = null; // Maintains id of current spouse
  }
}

export class FamilyTree {
  constructor() {
    this.nodes = new Map();
    this.indexByName = new Map(); // Maintains unique name values for searching
  }

  addPerson({ id, name, birthdate }) {
    const searchName = name.trim().toLowerCase(); // Convert name to lower case for reliable searching
    const capitalisedName =
      searchName.charAt(0).toUpperCase() + searchName.slice(1); // Capitalise first letter for family tree display

    // Add a new individual
    const node = new PersonNode({
      id,
      name: capitalisedName,
      birthdate,
    });
    this.nodes.set(id, node);

    // Add name to name index if it doesn't already exist, then add id to index
    if (!this.indexByName.has(searchName)) {
      this.indexByName.set(searchName, new Set());
    }
    this.indexByName.get(searchName).add(id);

    return node;
  }

  searchByName(name) {
    // Get the id of individuals with a matching name.
    name = name.toLowerCase(); // Name set stored in lower case
    const results = this.indexByName.get(name);
    if (!results) {
      console.log(`Found 0 result(s).`);
    } else {
      console.log(`Found ${results.size} result(s).`);
      for (const id of results) {
        const node = this.nodes.get(id);
        console.log(`ID ${id}: ${node?.name}, DOB: ${node?.birthdate}`);
      }
    }
  }

  associateChild(parentId, childId, associateAll = "n") {
    // Reject matching inputs
    if (parentId === childId) {
      console.log(`Error: Parent and child ID cannot be equal.`);
    }

    // Check if they both individuals exist
    if (this.nodes.has(parentId) && this.nodes.has(childId)) {
      this.nodes.get(parentId).children.add(childId);
      this.nodes.get(childId).parents.add(parentId);
    } else {
      console.log(`Error: Parent and/or child does not exist.`);
      return;
    }

    console.log(
      `Success: ${
        this.nodes.get(parentId).name
      } (parent) has now been associated with ${this.nodes.get(childId).name}.`
    );

    if (associateAll === "y") {
      // Optional from prompt, will get add child to spouse of parentId (if applicable).
      const spouseId = this.nodes.get(parentId).spouse;
      if (!spouseId) {
        console.log(`Error: No spouse of ${parentId} found.`);
        return;
      }
      this.associateChild(spouseId, childId, "n");
    }
  }

  associateSpouse(spouseId1, spouseId2) {
    // Check inputs are not the same
    if (spouseId1 === spouseId2) {
      console.log(`Error: Cannot associate the same person as a spouse.`);
      return;
    }

    // Check whether they both exist as people
    if (!this.nodes.has(spouseId1) || !this.nodes.has(spouseId2)) {
      console.log(`Error: One or more spouses do not exist.`);
      return;
    }

    // Check neither already have spouses
    if (
      this.nodes.get(spouseId1).spouse !== null ||
      this.nodes.get(spouseId2).spouse !== null
    ) {
      console.log(`Error: One or more spouses already have a spouse.`);
      return;
    }

    // Assign spouse to each individual
    this.nodes.get(spouseId1).spouse = spouseId2;
    this.nodes.get(spouseId2).spouse = spouseId1;
    const nameOfSpouse1 = this.nodes.get(spouseId1).name;
    const nameOfSpouse2 = this.nodes.get(spouseId2).name;

    console.log(
      `Success: ${nameOfSpouse1} and ${nameOfSpouse2} are now associated as spouses.`
    );
  }

  detachSpouse(spouses) {
    // Check IDs are not the same
    if (spouses[0] === spouses[1]) {
      console.log(`Error: Cannot remove spouse from the same IDs.`);
      return;
    }

    // Confirm both spouse IDs have a spouse
    const spouse1Node = this.nodes.get(spouses[0]);
    const spouse2Node = this.nodes.get(spouses[1]);

    // Check IDs exists with spouses
    if (!spouse1Node || !spouse2Node) {
      console.log(`Error: One or more IDs do not not exist.`);
      return;
    }

    // Verify IDs are mutual spouses
    if (
      spouse1Node.spouse === spouses[1] &&
      spouse2Node.spouse === spouses[0]
    ) {
      spouse1Node.spouse = null;
      spouse2Node.spouse = null;
      console.log(
        `Success: ${spouse1Node.name} and ${spouse2Node.name} are no longer spouses.`
      );
    } else {
      console.log(
        `Error: ${spouse1Node.name} and ${spouse2Node.name} are not mutual spouses.`
      );
    }
  }

  outputFamilyOf(id) {
    const node = this.nodes.get(id);

    if (!node) {
      console.log(`Error: ID ${id} not found.`);
      return;
    }

    let spouseStr;
    if (node.spouse) {
      spouseStr = "(Spouse: " + this.nodes.get(node.spouse).name + ")";
    } else {
      spouseStr = "";
    }

    // Begin display of family tree
    console.log();
    console.log(`=== Beginning of ${node.name}'s family tree ===`);
    console.log(
      `${node.name} (ID: ${node.id}), DOB: ${node.birthdate} ${spouseStr}`
    );

    // Output children
    this.outputChildren(node.id);

    // Close display of family tree
    console.log(`=== End of ${node.name}'s family tree ===`);
    console.log();
  }

  outputChildren(parentId, indentBase = "") {
    const node = this.nodes.get(parentId);
    if (node.children.size === 0) return; // Exit recursion if no more children

    let indent = indentBase + "  "; // For each generation, increase indent

    for (const childId of node.children) {
      const childNode = this.nodes.get(childId);
      if (childNode) {
        console.log(`${indent}└ Child: ${childNode.name}`);
        this.outputChildren(childNode.id, indent);
      } else {
        console.log(`Error: Child not found`);
      }
    }
  }

  updateName(personId, newName) {
    const searchName = newName.trim().toLowerCase(); // Convert name to lower case for reliable searching
    const capitalisedName =
      searchName.charAt(0).toUpperCase() + searchName.slice(1); // Capitalise first letter for family tree display

    // Find existing person
    const node = this.nodes.get(personId);
    if (!node) {
      console.log(`Error: ID ${personId} not found.`);
      return;
    }

    // Find key of old name (before update), remove from set
    const oldKey = node.name.toLowerCase();
    const oldSet = this.indexByName.get(oldKey);
    if (oldSet) {
      oldSet.delete(node.id);
      //  If set is now empty, delete the set
      if (oldSet.size === 0) {
        this.indexByName.delete(oldKey);
      }
    }

    // If new name key doesn't exist in name index, create it
    if (!this.indexByName.has(searchName)) {
      this.indexByName.set(searchName, new Set());
    }
    // Add personId to name index
    this.indexByName.get(searchName).add(node.id);

    // Update the name in the family tree
    node.name = capitalisedName;
    console.log(
      `Success: ID ${node.id} name updated from ${oldKey} to ${node.name}.`
    );
  }

  updateBirthdate(personId, newBirthdate) {
    const node = this.nodes.get(personId);
    node.birthdate = newBirthdate;
    console.log(
      `Success: ${node.name} (ID: ${node.id}) birthdate updated to ${node.birthdate}`
    );
  }
}
