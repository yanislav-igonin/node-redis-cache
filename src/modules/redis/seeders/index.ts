import redis from '..';

export default async (): Promise<void> => {
  for (let i = 0; i < 15; i += 1) {
    redis.setAsync(`${i}`, `value-${i}`);
  }
};
