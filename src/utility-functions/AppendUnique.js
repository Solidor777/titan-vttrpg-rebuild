// Adds each entry from the source array to the destination array,
// provided that each entry is not already in the array.
export default function appendUnique(destination, source) {
   source.forEach((value) => {
      if (destination.indexOf(value) < 0) {
         destination.push(value);
      }
   });
}