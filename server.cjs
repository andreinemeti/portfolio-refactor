const path = require('path');
const express = require('express');
const compression = require('compression');
const next = require('next');

const dev = false;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

async function start() {
  await app.prepare();
  const server = express();
  server.set('trust proxy', true);
  server.use(compression());
  server.get('/healthz', (_req, res) => res.status(200).send('ok'));
  server.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: '1y', immutable: true }));
  server.use((req, res) => handle(req, res)); // catch-all for Express 5
  server.listen(process.env.PORT || 3000, () => console.log('> Ready'));
}
start().catch(err => { console.error('Startup error:', err); process.exit(1); });
