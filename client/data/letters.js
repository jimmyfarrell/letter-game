import { range } from 'underscore';

const uppercase = range(65, 91).map(charCode => String.fromCharCode(charCode));
const lowercase = uppercase.map(letter => letter.toLowerCase());

const letters = { uppercase, lowercase };

export default letters;
