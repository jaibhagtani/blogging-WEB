import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, CreateBlogInput, updateBlogInput } from '@jaibhagtani/medium-common';

// whenever you are initialising the types of environment variables

// ******************** IMP BIT ********************
// ************ Way to do it in hono is this ************
const blogRouter = new Hono<{ Bindings:
  {
    DATABASE_URL: string,
    JWT_SECRET : string
  }
}>();
// Bad practice .
// ********** @ts-ignore **********
// env variable in ts in hono, we have to specify the type of it 


// middleware
blogRouter.use("/*", async (c, next) => {

  // get the Headers,
  // verify the Headers,
  // if the headers are correct, we need to proceed,
  // if not, we return the user a 403 status code 


  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())

  try{

    const header = c.req.header('Authorization') || "";
    // console.log(token);
    const splited = header.split(" ");
    if(splited[0] != 'Bearer')
    {
      c.status(403);
      return c.json({
        msg: "Unauthorized"
      }) 
    }
    const token = splited[1];
    const decodedValue = await verify(token, c.env.JWT_SECRET) || "";
    if(decodedValue)
    {
      // Extract the user id and 
      // pass it down to the route handlers 
      c.set("jwtPayload", decodedValue.id);
      await next();
    }
    else 
    {
      c.status(403);
      return c.json({
      msg: "Unauthorized"
      })
    }
  }
  catch(e)
  {
    c.status(500);
    return c.json({
      error : "Incorrect Authorization",
    })
  }
});



// post
blogRouter.post('/', async (c) => {
  
  const body = await c.req.json();
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  // Zod validation
  const inputblog = createBlogInput.safeParse(body);
  if(!inputblog.success)
  {
    c.status(411);
    return c.json({
      msg : "Body Structure Not valid"
    })
  }
  try{
    const authorId = c.get('jwtPayload')
    console.log(authorId);
    const addedblog = await prisma.blog.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        authorId: authorId
      },
      select: {
        id: true
      }
    })

    
    return c.json({
      msg : "Blog Added Successfully!!",
      id : addedblog.id
    });
  }
  catch{
    c.status(500);
    return c.json({
      msg : "Error occured during Adding Blog!!"
    })
  }
  
});

// put
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
  const body = await c.req.json();
  const updateblog = updateBlogInput.safeParse(body);
  if(!updateblog.success)
  {
    c.status(411);
    return c.json({
      msg : "Update Body Structure is not valid"
    })
  }
  try{
    const updatedBlog = await prisma.blog.updateMany({
      where: {
        // This is the id blog to be updated
        id: body.id
      },
      data:{
        title: body.title,
        description: body.description,
        content: body.content,
        published: body.published
      }
    })

    return c.json({
      msg : "Blog updated Successfully!!",
    })
  }
  catch(err){
    c.status(500);
    return c.json({
      msg: "Error Occured During Updating Blog"
    })
  }
});

// IDEALLY
// like 10 blogs or some limit like 
// TODO : ADD ***************** PAGINATION ********************
// This kept upper because the below route was taking input to this as well,
// therefore now if this route fails then only the below one will handle or run 
blogRouter.get("/bulk", async (c) => {
  
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())

  const getAllBlogs = await prisma.blog.findMany({
    select: {
      id:true,
      title: true,
      description: true,
      content:true,
      author: {
        select: {
          name:true
        }
      }
    }
  });
  return c.json({
    // msg: "All Title Blogs are as follows : ",
    getAllBlogs
  })
});



blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())

  const id = c.req.param('id');
  try{
    const getBlogs = await prisma.blog.findFirst({
      where: {
        // it is the id of blog
        id: id
      },
      select: {
        id:true,
        title: true,
        content: true,
        description: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    if(getBlogs)
    {
      return c.json({
        msg: "Following Blogs associated with this Blog ID :",
        getBlogs
      })
    }
    else 
    {
      c.status(411);
      return c.json({
        msg: "No Blogs Found associated with this Blog ID"
      })
    }
  }
  catch(err) {
    c.status(500);
    return c.json({
      msg: "Error While Fetching Blogs"
    })
  }
});




export default blogRouter;
