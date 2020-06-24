// @flow
import { isElement } from 'react-is';
import getComponentName from './getComponentName';
import isFunction from './isFunction';
import isStatelessFunction from './isStatelessFunction';
import isPlainObject from './isPlainObject';
import isStyledComponent from './isStyledComponent';
// import Keyframes from '../models/Keyframes';
import hyphenate from './hyphenateStyleName';
import addUnitIfNeeded from './addUnitIfNeeded';
// import { IS_BROWSER } from '../constants';
const IS_BROWSER = true
/**
 * It's falsish not falsy because 0 is allowed.
 */
const isFalsish = chunk => chunk === undefined || chunk === null || chunk === false || chunk === '';

export const objToCssArray = (obj: Object, prevKey?: string): Array<string | Function> => {
  const rules = [];
  const keys = Object.keys(obj);

  keys
    .forEach(key => {
      if (!isFalsish(obj[key])) {
        if (isPlainObject(obj[key])) {
          rules.push(...objToCssArray(obj[key], key));

          return rules;
        } else if (isFunction(obj[key])) {
          rules.push(`${hyphenate(key)}:`, obj[key], ';');

          return rules;
        }
        rules.push(`${hyphenate(key)}: ${addUnitIfNeeded(key, obj[key])};`);
      }
      return rules;
    });
  console.log('test', obj, rules);


  return prevKey
    ? [`${prevKey} {`, ...rules, '}']
    : rules;
};
if (IS_BROWSER) {
  window.flatten = flatten;
}
export default function flatten(chunk: any, executionContext: ?Object): any {
  if (Array.isArray(chunk)) {
    const ruleSet = [];
    for (let i = 0, len = chunk.length, result; i < len; i += 1) {
      result = flatten(chunk[i], executionContext);
      if (result === '') continue;
      else if (Array.isArray(result)) ruleSet.push(...result);
      else ruleSet.push(result);
    }

    return ruleSet;
  }
  if (isFalsish(chunk)) {
    return '';
  }
  if (isFunction(chunk)) {
    if (isStatelessFunction(chunk) && executionContext) {
      const result = chunk(executionContext);
      return flatten(result, executionContext);
    } else return chunk;
  }
    return chunk;
}
