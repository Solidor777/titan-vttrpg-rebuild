export default function getSumOfObjectValues(object) {
   let retVal = 0;
   for (const value of Object.values(object)) {
      retVal += value;
   }

   return retVal;
}