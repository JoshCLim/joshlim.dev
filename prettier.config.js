/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  importOrder: [
    "^next$",
    "^next/(.*)$",
    "^next-auth$",
    "^next-auth/(.*)$",
    "^react$",
    "^~/server/(.*)$",
    "^~/trpc/(.*)$",
    "^~/env([.]js)?$",
    "^~/app/api/(.*)$",
    "^~/app/(.*)$",
    "~(.*)",
    "^[./]",
    ".*",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // ! must come last
  ],
};

export default config;
