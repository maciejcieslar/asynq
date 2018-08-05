import { isGeneratorLike } from './utils';

const asynq = (generatorFactory: () => IterableIterator<any>) => {
  const generator = generatorFactory();

  if (!isGeneratorLike(generator)) {
    return Promise.reject(
      new Error('Provided function must return a generator.'),
    );
  }

  return (function resolve(result) {
    if (result.done) {
      return Promise.resolve(result.value);
    }

    return Promise.resolve(result.value)
      .then((ensuredValue) => resolve(generator.next(ensuredValue)))
      .catch((error) => resolve(generator.throw(error)));
  })(generator.next());
};

export { asynq };
