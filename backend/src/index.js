import { Hono } from 'hono';
import routers from './routes/routers';
import { cors } from 'hono/cors'
const app = new Hono();
app.use('/*', cors());
app.route('/api/v1', routers);
export default app;
