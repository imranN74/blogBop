import { Hono } from "hono";
import { statusCodes, userAuthorization } from "../middleware/userAuth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postBlog, updatePostBlog } from "@imrannazir/medium-common-zod";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// route to handle post creation
blogRouter.post("/", userAuthorization, async (c) => {
  const body = await c.req.json();
  const { success } = postBlog.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "invalid inputs",
      },
      statusCodes.badRequest
    );
  }

  const id = c.get("jwtPayload");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const res = await prisma.blog.create({
      data: {
        authorId: id,
        title: body.title,
        content: body.content,
      },
    });

    return c.json(
      {
        message: "blog posted successfully",
      },
      statusCodes.created
    );
  } catch (err) {
    return c.json(
      {
        message: "something went wrong while posting blog",
      },
      statusCodes.wentWrong
    );
  }
});

//route to handle get all the blogs
blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(blogs);
    return c.json(
      {
        data: blogs,
      },
      statusCodes.success
    );
  } catch (err) {
    return c.json(
      {
        message: "something went wrong",
      },
      statusCodes.wentWrong
    );
  }
});

//route to update blog
blogRouter.post("/edit/:id", userAuthorization, async (c) => {
  const body = await c.req.json();
  const blogId = c.req.param("id");

  const { success } = updatePostBlog.safeParse(body);
  if (!success) {
    return c.json(
      {
        message: "invalid inputs",
      },
      statusCodes.badRequest
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.blog.update({
      data: {
        title: body.title,
        content: body.content,
      },
      where: {
        id: blogId,
      },
    });
    return c.json(
      {
        message: "post updated successfully",
        blogId: res.id,
      },
      statusCodes.success
    );
  } catch (err) {
    return c.json(
      {
        message: "something went wrong",
      },
      statusCodes.wentWrong
    );
  }
});

//route to get specific blog
blogRouter.get("/:postId", userAuthorization, async (c) => {
  const blogId = c.req.param("postId");
  const authId = c.get("jwtPayload");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const specificBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (specificBlog) {
      return c.json(
        {
          data: specificBlog,
          isAuther: authId === specificBlog.authorId,
        },
        statusCodes.success
      );
    } else {
      return c.json(
        {
          message: "Post not found",
        },
        statusCodes.notFound
      );
    }
  } catch (err) {
    return c.json(
      {
        message: "something went wrong",
      },
      statusCodes.wentWrong
    );
  }
});

//Delete blog
blogRouter.post("/delete/:id", userAuthorization, async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.update({
      data: {
        published: false,
      },
      where: {
        id: blogId,
      },
    });

    return c.json(
      {
        message: "post deleted",
      },
      statusCodes.success
    );
  } catch (error) {
    return c.json(
      {
        message: "something went wrong",
      },
      statusCodes.wentWrong
    );
  }
});
