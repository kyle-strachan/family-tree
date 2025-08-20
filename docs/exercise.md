# Family Tree Data Structure

In this exercise, you will create a data structure to represent a **family tree**. This family tree will allow you to store information about each individual family member, including their name, birthdate, and other relevant details. You will also implement various functions to manage the tree, such as adding family members, defining relationships, and updating individual details.

## Key Objectives

### 1. Family Tree Data Structure
The family tree will consist of nodes representing each person. Each node will contain the following information about a person:
- **Name**: The person's name.
- **Birthdate**: The person's date of birth.
- **Other details(optional)**: Any other relevant information about the person, such as gender, occupation, etc. **TO DO** 

The family tree will be structured in a way that allows for easy relationships between people, especially parent-child relationships.

### 2. Adding Family Members DONE
You will need to implement a function that allows you to **add new family members** to the family tree. Each person should be connected to their parent(s) through relationships, which will be represented as parent-child connections.

### 3. Defining Parent-Child Relationships DONE
One of the primary features of the family tree is to define relationships. In this case, the **parent-child** relationship will be fundamental. You will create a function that allows you to connect a parent to their child, ensuring that the child is linked to the correct parent in the tree.

### 4. Updating Individual Details DONE
Over time, you may need to update details about a family member. You should create a function to **update information** for any individual, such as changing their name, adding new details, or updating existing ones.

---

## Traversal and Descendants Display

### 5. Traversal Algorithm DONE
You will implement a **traversal algorithm** to navigate through the family tree. The goal is to find and display all descendants of a given person. A traversal will start from a selected individual and move down the tree to identify all of their descendants.

### 6. Displaying Descendants DONE
The system should allow you to input the name of a person, and it will return a list of all their descendants. These descendants will be displayed in a clear manner, showing the entire family lineage.

For example, if you input the name "John," the system might output:
- John
  - Alex
    - Sarah
    - Michael
  - Emily

---

## Example Walkthrough

Here is an example scenario for better understanding:

### Step 1: Add family members
- Add a person named "John Doe," born on January 1st, 1980.
- Add a person named "Jane Doe," born on March 15th, 1982, and set her as the spouse of "John Doe."
- Add children, for instance, "Alex Doe" and "Emily Doe" as children of "John" and "Jane."

### Step 2: Define relationships
- Set "John" and "Jane" as the parents of "Alex" and "Emily."

### Step 3: Traverse the tree and display descendants
- If you choose "John Doe," the system will output all his descendants, including his children and grandchildren, if applicable.

---
