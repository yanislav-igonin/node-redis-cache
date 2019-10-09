interface IRedisConfig {
  host: string;
}

const redis: IRedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
};

export default redis;
