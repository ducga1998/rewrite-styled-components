// @flow
import interleave from './interleave';
import isPlainObject from './isPlainObject';
import isFunction from './isFunction';
import flatten from './flatten';
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
