import { Hono } from 'hono';
import blogRouter from './blogRoutes';
import userRouter from './userRoutes';

const routers = new Hono();

routers.route('/blog', blogRouter);
routers.route('/user', userRouter);

export default routers;
