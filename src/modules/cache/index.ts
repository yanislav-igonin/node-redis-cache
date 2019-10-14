import redis from '../redis';
import { cache as cacheConfig } from '../../config';

const cache = new Map();
const cacheExpiration: {[key: string]: NodeJS.Timeout} = {};
let currentCacheFullness = 0;
const minUsedCacheKey: { key: string; times: number} = {
  key: '',
  times: 0,
};


const remove = (key: string): void => {
  if (cacheExpiration[key] !== undefined) {
    clearTimeout(cacheExpiration[key]);
  }
  cache.delete(key);
};

const add = async (key: string, value: string): Promise<void> => {
  if (currentCacheFullness === cacheConfig.capacity) {
    remove(minUsedCacheKey.key);
  }

  cache.set(key, value);
  cacheExpiration[key] = setTimeout(() => remove(key), cacheConfig.expireTime);
  currentCacheFullness += 1;
};

const get = async (key: string): Promise<string> => {
  let value = cache.get(key);

  if (value === undefined) {
    value = await redis.getAsync(key);
    await add(key, value);
  }

  return value;
};

export default { get };
