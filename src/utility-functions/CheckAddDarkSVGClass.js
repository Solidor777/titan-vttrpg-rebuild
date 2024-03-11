// Adds the dark-svg class if the source image is a .svg file.
export default function checkAddDarkSVGClass(source) {
   return source.indexOf('.svg') === -1 ? '' : 'dark-svg';
}