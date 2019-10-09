import * as redis from 'redis';
import { promisify } from 'util';
import { redis as redisConfig } from '../../config';

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
});

client.on('error', (err: Error): void => {
  console.error(err);
});

client.on('ready', (): void => {
  console.log('redis - online');
});

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
};
