"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
// The logic here written is used by both F.E. and B.E.
// *****************************************************
// This is because B.E. needs these objects but,
// F.E. only needs types of these to know F.E. developer, 
// the schema of the endpoint, while axios or fetch 
// we have to publish this to use by anyone, can be F.E. or B.E.
// These my B.E. will need, I have to publish this to npm 
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean().optional()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean().optional(),
    id: zod_1.z.string()
});
