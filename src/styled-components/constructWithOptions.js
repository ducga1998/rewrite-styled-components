// @flow
import css from './css';

export default function constructWithOptions(
  componentConstructor,
  tag,
) {
    
  const templateFunction = (...args) => componentConstructor(tag, css(...args));

  templateFunction.withConfig = config =>
    constructWithOptions(componentConstructor, tag,  config );

  templateFunction.attrs = attrs =>
    constructWithOptions(componentConstructor, tag, {
      attrs: Array.prototype.concat( attrs).filter(Boolean),
    });
  return templateFunction;
}