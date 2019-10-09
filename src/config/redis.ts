interface IRedisConfig {
  host: string;
  port: number;
}

const { REDIS_HOST, REDIS_PORT } = process.env;

const redis: IRedisConfig = {
  host: REDIS_HOST || 'localhost',
  port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : 6379,
};

export default redis;
