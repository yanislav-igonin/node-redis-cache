interface ICacheConfig {
  expireTime: number;
  capacity: number;
}

const { CACHE_EXPIRE_TIME, CACHE_CAPACITY } = process.env;

const cache: ICacheConfig = {
  expireTime: CACHE_EXPIRE_TIME ? parseInt(CACHE_EXPIRE_TIME, 10) : 10000,
  capacity: CACHE_CAPACITY ? parseInt(CACHE_CAPACITY, 10) : 10,
};

export default cache;
