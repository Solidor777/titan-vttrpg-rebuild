// Adds each entry from the source array to the destination array,
// provided that each entry is not already in the array.
// Uses a filter function to determine if the values match
export default function appendUniqueWithFilter(destination, source, filter) {
   source.forEach((value) => {
      if (!destination.find((match) => filter(value, match))) {
         destination.push(value);
      }
   });
}