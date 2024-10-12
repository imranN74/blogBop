import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export enum statusCodes {
  notFound = 400,
  created = 201,
  success = 200,
  wentWrong = 500,
  notAuthorized = 403,
  badRequest = 400,
}

export async function userAuthorization(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("authorization") || "";

    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.json(
        {
          message: "you are not logged in",
        },
        statusCodes.notAuthorized
      );
    }
    const authUser = await verify(token, c.env.JWT_SECRETEKEY);

    c.set("jwtPayload", authUser.userId);
    await next();
  } catch (err) {
    console.log(err);
    console.log(err);
    return c.json(
      {
        message: "session has expired",
      },
      statusCodes.notAuthorized
    );
  }
}
