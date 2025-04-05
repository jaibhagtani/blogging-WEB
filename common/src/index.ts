import { z } from "zod";

// The logic here written is used by both F.E. and B.E.

// *****************************************************
// This is because B.E. needs these objects but,
// F.E. only needs types of these to know F.E. developer, 
// the schema of the endpoint, while axios or fetch 

// we have to publish this to use by anyone, can be F.E. or B.E.
// These my B.E. will need, I have to publish this to npm 
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export const createBlogInput = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    published: z.boolean().optional()
})


export const updateBlogInput = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    id: z.string()
})

// type inference in zod
// These are the four types my frontend will need, 
// whenever I need while maintaining State 
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
