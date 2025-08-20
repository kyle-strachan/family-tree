export function maximumId(map) {
  // Auto-assign the next highest ID, to prevent duplicate IDs

  if (!map || map.size === 0) return 0;

  let largest = -Infinity;

  for (const person of map.values()) {
    if (person.id > largest) {
      largest = person.id;
    }
  }
  return largest;
}
