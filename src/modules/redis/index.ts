import * as redis from 'redis';
import { promisify } from 'util';
import { redis as redisConfig } from '../../config';
import seed from './seeders';

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
});

client.on('error', (err: Error): void => {
  console.error(err);
});

client.on('ready', async (): Promise<void> => {
  console.log('redis - online');
  await seed();
  console.log('redis - seeding - success');
});

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
};
