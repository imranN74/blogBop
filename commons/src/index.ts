import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const postBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type PostBlog = z.infer<typeof postBlog>;
export type UpdatePostBlog = z.infer<typeof updatePostBlog>;
