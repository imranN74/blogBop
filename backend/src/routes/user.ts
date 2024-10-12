import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { statusCodes } from "../middleware/userAuth";
import { signinInput, signupInput } from "@imrannazir/medium-common-zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETEKEY: string;
  };
}>();

//route to handle user sign up
userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
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
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const token = await sign(
      {
        userId: user.id,
      },
      c.env.JWT_SECRETEKEY
    );

    return c.json(
      {
        token,
      },
      statusCodes.success
    );
  } catch (err: any) {
    console.log(err.data);
    if (err.code === "P2002") {
      return c.json(
        {
          message: "email already registered",
        },
        409
      );
    } else {
      return c.json(
        {
          message: "something went wrong while signing up",
        },
        statusCodes.wentWrong
      );
    }
  }
});

//route to handle user signin
userRouter.post("/login", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
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
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json(
        {
          message: "inavlid email or password",
        },
        statusCodes.notAuthorized
      );
    }
    // console.log(user);
    const token = await sign(
      {
        userId: user.id,
      },
      c.env.JWT_SECRETEKEY
    );
    return c.json(
      {
        token,
      },
      statusCodes.success
    );
  } catch (err) {
    console.log(err);
    return c.json(
      {
        message: "something went wrong while signingIn",
      },
      statusCodes.wentWrong
    );
  }
});
