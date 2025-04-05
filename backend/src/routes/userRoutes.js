import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@jaibhagtani/medium-common';
// whenever you are initialising the types of environment variables
// ******************** IMP BIT ********************
// This is to tell ts the types of env variables 
// ***************** V.V.V.V.IMP *****************
// In generics
// Also, here we need to define or initialize 
// prisma not GLOBALLY, it taken by c only, and we have no access to it, 
// ***************** We can do using middlewares, or inside *****************
const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    // we have to await it , Like fetch
    const body = await c.req.json();
    // Ideally
    // **************** ZOD, hashed password ****************
    // Zod validation 
    const validation = signupInput.safeParse(body);
    if (!validation.success) {
        c.status(411);
        return c.json({
            msg: "Invalid Signup Credential structure"
        });
    }
    try {
        // duplicate email => handled by schema
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            },
        });
        // Authentication
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token });
    }
    catch (err) {
        console.log("error occured", err);
        c.status(411);
        return c.json({
            error: "Error occured during signup",
        });
    }
});
userRouter.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const body = await c.req.json();
        const validation = signinInput.safeParse(body);
        if (!validation.success) {
            c.status(411);
            return c.json({
                msg: "Invalid Signin Credentials Structure"
            });
        }
        const userfound = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!userfound) {
            // unauthorized, wrong credentials
            c.status(403);
            return c.json({
                error: "Incorrect Credentials"
            });
        }
        console.log(userfound);
        const jwt = await sign({ id: userfound.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: jwt
        });
    }
    catch (err) {
        c.status(500);
        return c.json({
            error: "Error occured during Signin"
        });
    }
});
export default userRouter;
