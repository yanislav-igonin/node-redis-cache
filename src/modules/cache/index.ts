import redis from '../redis';
import { cache as cacheConfig } from '../../config';

interface ICacheExpiration {
  [key: string]: NodeJS.Timeout;
}

const cache = new Map();
const cacheExpiration: ICacheExpiration = {};

const remove = (key: string): boolean => cache.delete(key);

const add = async (key: string, value: string): Promise<void> => {
  cache.set(key, value);
  cacheExpiration[key] = setTimeout(() => remove(key), cacheConfig.expireTime);
};

const get = async (key: string): Promise<string> => {
  let value = cache.get(key);

  if (value === null) {
    value = await redis.getAsync(key);
    await add(key, value);
  }

  return value;
};

export default { get };
