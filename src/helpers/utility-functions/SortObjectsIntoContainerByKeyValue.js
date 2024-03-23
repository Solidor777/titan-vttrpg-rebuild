// Returns an object with arrays of the inputted array of objects
// mapped by the value of a respective key shared by each object
export default function sortObjectsIntoContainerByKeyValue(objects, key) {
   // Create retval object
   const retVal = {};

   // For each object
   for (const object of objects) {

      // Find the value of the key for this object
      const keyArray = object[key];

      // If the array for the value of this object's key does not already exist in the retval,
      // then create the array and add it to the retval
      if (!retVal[keyArray]) {
         retVal[keyArray] = [];
      }

      // Add this object to the array for the value of this object's key
      retVal[keyArray].push(object);
   }

   return retVal;
}
