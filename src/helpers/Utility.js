export function isCheck(chatMessageType) {
   switch (chatMessageType) {
      case 'attackCheck':
      case 'attributeCheck':
      case 'resistanceCheck':
      case 'castingCheck':
      case 'itemCheck': {
         return true;
      }
      default: {
         return false;
      }
   }
}

export function pushUnique(array, value) {
   if (array.indexOf(value) < 0) {
      return array.push(value);
   }

   return false;
}

export function appendUnique(destination, source) {
   source.forEach((value) => {
      if (destination.indexOf(value) < 0) {
         destination.push(value);
      }
   });
}

export function appendUniqueWithFilter(destination, source, filter) {
   source.forEach((value) => {
      if (!destination.find((match) => filter(value, match))) {
         destination.push(value);
      }
   });
}