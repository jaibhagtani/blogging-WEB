import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    content: string;
    published?: boolean | undefined;
}, {
    title: string;
    description: string;
    content: string;
    published?: boolean | undefined;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}, {
    title: string;
    description: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
