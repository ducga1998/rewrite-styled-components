// @flow
import interleave from '../utils/interleave';
import isPlainObject from '../utils/isPlainObject';
import isFunction from '../utils/isFunction';
import flatten from '../utils/flatten';
export default function css(styles, ...interpolations) {
  if (isFunction(styles) || isPlainObject(styles)) {
    const values  = flatten(interleave([], [styles, ...interpolations]));
    return values
  }
  if(interpolations.length === 0 && styles.length === 1 && typeof styles[0] === "string") {
    return styles;
  }
 
return flatten(interleave(styles, interpolations));
}
window.css = css
