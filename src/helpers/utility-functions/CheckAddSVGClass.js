// Adds the svg class if the source image is a .svg file.
export default function checkAddSVGClass(source) {
   return source.indexOf('.svg') === -1 ? '' : 'svg';
}