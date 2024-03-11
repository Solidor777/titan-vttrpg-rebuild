// Returns an object with arrays of the inputted array of objects
// mapped by the return value of a function accepting the object as an argument
export default function sortObjectsIntoContainerByFunctionValue(objects, sortFunction) {
   // Create retval object
   const retVal = {};

   // For each object
   for (const object of objects) {

      // Find the value of the function for this object
      const sortedKey = sortFunction(object);

      // If the array for the value of this object's key does not already exist in the retval,
      // then create the array and add it to the retval
      if (!retVal[sortedKey]) {
         retVal[sortedKey] = [];
      }

      // Add this object to the array for the value of this object's key
      retVal[sortedKey].push(object);
   }

   return retVal;
}