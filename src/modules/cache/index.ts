import redis from '../redis';
import { cache as cacheConfig } from '../../config';

const cache = new Map();
const cacheHitCount: {[key: string]: number} = {};
const cacheExpiration: {[key: string]: NodeJS.Timeout} = {};
let currentCacheFullness = 0;
let minUsedCacheKey: string;

const findMinUsedCacheKey = (): string => {
  const values = Object.entries(cacheHitCount);

  const sorted = values.sort((a, b) => a[1] - b[1]);
  console.log('DEBUG: sorted', sorted);

  return sorted[0][0];
};

const remove = (key: string): void => {
  console.log(`remove -> key: ${key}`);
  cache.delete(key);
  delete cacheHitCount[key];
  clearTimeout(cacheExpiration[key]);
  delete cacheExpiration[key];
  currentCacheFullness -= 1;
};

const update = (key: string): void => {
  console.log(`update -> key: ${key}`);
  cacheExpiration[key].refresh();
  cacheHitCount[key] += 1;
};

const add = async (key: string, value: string): Promise<void> => {
  console.log(`add -> key: ${key}, value: ${value}`);
  if (currentCacheFullness >= cacheConfig.capacity) {
    console.log('cache full');
    minUsedCacheKey = findMinUsedCacheKey();
    console.log('DEBUG: minUsedCacheKey', minUsedCacheKey);
    remove(minUsedCacheKey);
  }

  cache.set(key, value);
  cacheHitCount[key] = 1;
  cacheExpiration[key] = setTimeout(() => remove(key), cacheConfig.expireTime);
  currentCacheFullness += 1;
};

const get = async (key: string): Promise<string | null> => {
  console.log(`get -> key: ${key}`);
  let value = cache.get(key);

  if (value === undefined) {
    value = await redis.getAsync(key);

    if (value !== null) {
      await add(key, value);
    }
  } else {
    update(key);
  }

  console.log('==========================');

  return value;
};

export default { get };
