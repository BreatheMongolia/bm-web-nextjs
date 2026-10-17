# Project review notes

These are findings from a source review, not confirmed production incidents. Reproduce behavior before changing an integration.

## Follow-ups

1. **Check pledge and feedback submissions in the browser.** `components/TakeActionPage/PledgeBox.tsx` and `components/TakeActionPage/UserFeedBack.tsx` call `fetchAPI` from client-side event handlers. `lib/graphql-api/api.ts` reads `process.env.WORDPRESS_API_URL`, which is not a `NEXT_PUBLIC_` variable. Next.js does not normally expose server-only environment values to browser bundles, so the browser may try to post to an undefined URL. Use a server endpoint for mutations and verify both flows end to end.
2. **Review sensor API credentials.** `components/HomePage/MapComponent/consts.ts` contains API key constants in tracked source. Determine whether these keys are active, rotate them if appropriate, and move requests that require private credentials behind a server boundary. Do not copy key values into issues, logs, or documentation.
3. **Keep setup instructions aligned with scripts.** The original README referred to a nonexistent `.env.local.example` and port 9001 for development. The tracked template is `.env.example`, `yarn dev` uses port 9000, and `yarn start` uses 9001. The README has been corrected; update it when scripts change.
4. **Plan for external dependencies in checks.** `yarn dev` runs remote GraphQL code generation; `yarn build` can fetch WordPress and sensor data. Playwright needs a running server or `APP_URL` and does not start one. CI points tests at a Vercel preview. Failures in these checks can reflect service availability as well as code changes.

## Scope of this review

The review covered repository structure, representative routes, data access, localization, scripts, and test configuration. It did not run a live site, exercise submissions, validate current API keys, or audit every component. Prioritize browser verification of the first finding before treating it as a confirmed bug.
