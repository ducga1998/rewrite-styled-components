
const isFalsish = chunk => chunk === undefined || chunk === null || chunk === false || chunk === '';
export default function flatten(chunk, executionContext) {
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
    return chunk;
}
