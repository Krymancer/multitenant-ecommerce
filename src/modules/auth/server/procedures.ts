import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = ctx.payload.auth({ headers });
    return session;
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
          .min(3, "Username must be at least 3 characters long")
          .max(63, "Username must be at most 63 characters long")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "Username must start and end with a letter or number, and can only contain letters, numbers, and hyphens. It must start and end with a letter or number."
          )
          .refine(
            (val) => !val.includes("--"),
            "Username cannot contain consecutive hyphens"
          )
          .transform((val) => val.toLowerCase()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
          username: input.username,
        }
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        })
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: "",
      });

      return data;
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        })
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: "",
      });

      return data;
    }),
  logout: baseProcedure.mutation(async ({ ctx }) => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  })
});