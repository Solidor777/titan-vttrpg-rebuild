// Adds entry to array if it does not already exist in the array
export default function pushUnique(array, value) {
   if (array.indexOf(value) < 0) {
      return array.push(value);
   }

   return -1;
}