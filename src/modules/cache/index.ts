import redis from '../redis';
import { cache as cacheConfig } from '../../config';

const cache = new Map();
const cacheHitCount = new Map();
const cacheExpiration = new Map();
let minUsedCacheKey: string;

const findMinUsedCacheKey = (): string => {
  const values = Array.from(cacheHitCount);

  const sorted = values.sort((a, b) => a[1] - b[1]);
  console.log('DEBUG: sorted', sorted);

  return sorted[0][0];
};

const remove = (key: string): void => {
  // console.log(`remove -> key: ${key}`);
  cache.delete(key);
  cacheHitCount.delete(key);
  clearTimeout(cacheExpiration.get(key));
  cacheExpiration.delete(key);
};

const update = (key: string): void => {
  // console.log(`update -> key: ${key}`);
  cacheExpiration.get(key).refresh();
  cacheHitCount.set(key, cacheHitCount.get(key) + 1);
};

const add = async (key: string, value: string): Promise<void> => {
  // console.log(`add -> key: ${key}, value: ${value}`);
  if (cache.size >= cacheConfig.capacity) {
    // console.log('cache full');
    minUsedCacheKey = findMinUsedCacheKey();
    remove(minUsedCacheKey);
  }

  cache.set(key, value);
  cacheHitCount.set(key, 1);
  cacheExpiration.set(key, setTimeout(() => remove(key), cacheConfig.expireTime));
};

const get = async (key: string): Promise<string | null> => {
  // console.log(`get -> key: ${key}`);
  let value = cache.get(key);

  if (value === undefined) {
    value = await redis.getAsync(key);

    if (value !== null) {
      await add(key, value);
    }
  } else {
    update(key);
  }

  // console.log('==========================');

  return value;
};

export default { get };
