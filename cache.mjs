import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

export default {
  ...client,
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  keys: promisify(client.keys).bind(client)
};
