import redis from 'redis';
import { promisify } from 'util';
import { redis as redisConfig } from '../../config';
import { IRedisClient } from './interfaces';

const getRedis = (): IRedisClient => {
  const client = redis.createClient({
    host: redisConfig.host,
  });

  // @ts-ignore
  return {
    ...client,
    getAsync: promisify(client.get).bind(client),
  };
};


export default getRedis();
