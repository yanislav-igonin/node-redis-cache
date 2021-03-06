import { createServer, IncomingMessage, ServerResponse } from 'http';
import { cache } from './modules';
import { app } from './config';

const handler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  if (req.method === 'GET') {
    const key = req.url ? req.url.split('/')[1] : '';
    const value = await cache.get(key);
    if (value === null) {
      res.statusCode = 404;
    }
    res.end(value);
  }
};

const server = createServer(handler);

server.listen(app.port, (): void => {
  console.log(`server - online on ${app.port}`);
  console.log('all systems nominal');
});
