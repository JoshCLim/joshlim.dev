# My Portfolio Website

I made this website to showcase my coding projects and put any cool / fun things I wanted to work on.

Upcoming features / potential ideas:

- Blog
- Notes / resources I've accumulated while at uni
- Games page

# Tech Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

Technologies used:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Development

Use Node.js 24 LTS (Next.js requires at least Node.js 20.9). Install the locked dependencies with `npm ci` and configure the variables listed in `.env.example` in a local `.env` file.

- `npm run dev`: start Next.js 16 with Turbopack.
- `npm run lint`: run ESLint directly; Next.js builds no longer run linting.
- `npm run typecheck`: generate route types and check TypeScript.
- `npm run build`: create the production build.
- `npm start`: serve the production build.

Before deploying, run lint, typecheck, and build, then check the homepage, `/projects`, graph preset loading and algorithm stepping, and both games. The authentication session and provider endpoints can be checked without signing in; a complete Discord sign-in needs configured credentials and a browser session.

### Migration follow-ups

The Next.js 16 migration preserves the existing game and visualiser behaviour. React Compiler diagnostics for legacy ref access, callback ordering, and effect-driven state updates remain warnings in four explicitly listed files in `eslint.config.mjs`; the compiler is not enabled.

After compatible security updates, `npm audit` reports five remaining findings (one high, four moderate) in Drizzle ORM and Drizzle Kit's dependency chain. These need a separate database-tooling upgrade; do not run `npm audit fix --force` or `db:push` as part of the framework migration.
