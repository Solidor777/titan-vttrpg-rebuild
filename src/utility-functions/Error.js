export default function error(message) {
   console.error(`TITAN | ${message}`);
   console.trace();
   return;
}