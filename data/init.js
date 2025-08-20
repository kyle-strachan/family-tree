import { FamilyTree } from "../familyTree/familyTree.js";

export const familyTree = new FamilyTree();

// Initial information, note ID is manually specified here as this bypasses the prompt sequence.
export function initDataLoad() {
  familyTree.addPerson({
    id: 1,
    name: "Jonathan",
    birthdate: "1955-12-01",
  });
  familyTree.addPerson({
    id: 2,
    name: "Anna",
    birthdate: "1960-02-10",
  });
  familyTree.addPerson({
    id: 3,
    name: "Morris",
    birthdate: "1991-10-16",
  });
  familyTree.addPerson({
    id: 4,
    name: "Sarah",
    birthdate: "2019-01-22",
  });
  familyTree.addPerson({
    id: 5,
    name: "Alistair",
    birthdate: "1993-07-29",
  });
  familyTree.addPerson({
    id: 6,
    name: "Heather",
    birthdate: "1985-04-16",
  });
  familyTree.addPerson({
    id: 7,
    name: "Jennifer",
    birthdate: "1995-01-05",
  });
  familyTree.addPerson({
    id: 8,
    name: "Chris",
    birthdate: "1970-01-01",
  });
  familyTree.addPerson({
    id: 9,
    name: "Zander",
    birthdate: "2020-11-25",
  });
  familyTree.addPerson({
    id: 10,
    name: "Thomas",
    birthdate: "2000-06-25",
  });
  familyTree.addPerson({
    id: 11,
    name: "Sophia",
    birthdate: "2001-06-25",
  });

  familyTree.associateSpouse(1, 2);
  familyTree.associateSpouse(3, 7);
  familyTree.associateSpouse(10, 11);
  familyTree.associateChild(1, 3, "y");
  familyTree.associateChild(1, 5, "y");
  familyTree.associateChild(3, 4, "y");
  familyTree.associateChild(10, 9, "y");
}
