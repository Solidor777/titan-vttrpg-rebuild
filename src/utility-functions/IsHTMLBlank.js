// Returns whether the inputted html is blank or an empty paragraph.
export default function isHTMLBlank(html) {
   return (!html || html === '' || html === '<p></p>');
}