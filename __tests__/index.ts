import { asynq } from '../src';

describe('asynq core', () => {
  test('Waits for values (like await does)', () => {
    return asynq(function*() {
      const a = yield Promise.resolve('a');
      expect(a).toBe('a');
    });
  });

  test('Catches the errors', () => {
    return asynq(function*() {
      const err = new Error('Hello there');

      try {
        const a = yield Promise.resolve('a');
        expect(a).toBe('a');

        const b = yield Promise.resolve('b');
        expect(b).toBe('b');

        const c = yield Promise.reject(err);
      } catch (error) {
        expect(error).toBe(err);
      }

      const a = yield Promise.resolve(123);
      expect(a).toBe(123);
    });
  });

  test('Ends the function if the error is not captured', () => {
    const err = new Error('General Kenobi!');

    return asynq(function*() {
      const a = yield Promise.reject(err);
      const b = yield Promise.resolve('b');
    }).catch((error) => {
      expect(error).toBe(err);
    });
  });

  test('Returns a promise with the returned value', () => {
    return asynq(function*() {
      const value = yield Promise.resolve(5);
      expect(value).toBe(5);

      return value;
    }).then((value) => {
      expect(value).toBe(5);
    });
  });
});
