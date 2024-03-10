import calculateCheckResults from "~/check/CalculateCheckResults.js";

export default function calculateAttributeCheckResults(inResults, parameters) {
   const results = calculateCheckResults(inResults, parameters);
   if (!results.succeeded && parameters.damageToReduce) {
      results.damageTaken = parameters.damageToReduce - results.successes;
   }

   return results;
}