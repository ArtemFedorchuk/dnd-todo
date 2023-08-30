export function removeStringFromArray(array, stringToRemove) {
  const index = array.indexOf(stringToRemove);
  if (index !== -1) {
    return array.splice(index, 1);
  }
}
