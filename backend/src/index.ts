import { Hono } from 'hono';
import { cors } from 'hono/cors';
import routers from './routes/routers';

const app = new Hono();
app.use('/*', cors());
app.route('/api/v1', routers);

export default app;
