const isObject = (obj: any) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const isFunction = (func: any) => typeof func === 'function';

const isGeneratorLike = (obj: any) =>
  isObject(obj) && isFunction(obj.next) && isFunction(obj.throw);

export { isObject, isFunction, isGeneratorLike };
