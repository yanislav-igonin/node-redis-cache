interface IRedisConfig {
  host: string;
}

const { REDIS_HOST } = process.env;

const redis: IRedisConfig = {
  host: REDIS_HOST || 'localhost',
};

export default redis;
