import { isObject, isFunction, isGeneratorLike } from '../src/utils';

describe('isObject', () => {
  test('detects objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });
});

describe('isFunction', () => {
  test('detects functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
  });
});

describe('isGeneratorLike', () => {
  const generatorFactory = function*() {};

  test('detects generators', () => {
    const generator = generatorFactory();

    expect(isGeneratorLike(generator)).toBe(true);
    expect(isGeneratorLike({})).toBe(false);
    expect(isGeneratorLike(null)).toBe(false);
  });
});
