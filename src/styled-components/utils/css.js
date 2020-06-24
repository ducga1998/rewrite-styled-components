import interleave from './interleave';
import { typeOf } from 'react-is';
import flatten from './flatten';
const  isPlainObject  =  (x) =>
  x !== null &&
  typeof x === 'object' &&
  (x.toString ? x.toString() : Object.prototype.toString.call(x)) === '[object Object]' &&
  !typeOf(x);
export default function css(styles, ...interpolations) {
  if (typeof (styles)  === 'function '|| isPlainObject(styles)) {
    const values  = flatten(interleave([], [styles, ...interpolations]));
    return values
  }
  if(interpolations.length === 0 && styles.length === 1 && typeof styles[0] === "string") {
    return styles;
  }
 
return flatten(interleave(styles, interpolations));
}
