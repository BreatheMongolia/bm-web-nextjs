# Development and verification

## Local setup

Use Node 22 to match the Playwright CI workflow and install dependencies with `yarn`. Copy `.env.example` to `.env.local` and configure `WORDPRESS_API_URL` for an accessible WordPress GraphQL endpoint. Add `NEXT_PUBLIC_MAPBOX_TOKEN` locally to use the map. Preview credentials are optional. Never commit `.env.local`.

```sh
cp .env.example .env.local
yarn install
yarn dev
```

`yarn dev` first runs `yarn generate` (`graphql-codegen`) using the remote schema in `codegen.yaml`, then starts Next.js on port **9000**. If schema access is unavailable and `graphql/generated.ts` already matches the code you are working on, `yarn next dev -p 9000` can start the app without regenerating types. `yarn start` runs an existing production build on port **9001**.

## Checks

| Command | Purpose | Dependency |
| --- | --- | --- |
| `yarn lint` | Next.js lint check | Local dependencies |
| `yarn test --runInBand` | Jest component tests | Local dependencies |
| `yarn e2e` | Playwright Chromium tests | Running site at `APP_URL` or `http://localhost:9000` |
| `yarn generate` | Refresh `graphql/generated.ts` | Remote schema in `codegen.yaml` |
| `yarn build` | Production build | WordPress; potentially sensor services |

The Playwright configuration does **not** start a server. Start one first, or point `APP_URL` at an existing deployment. CI runs the browser tests against a Vercel preview URL. For a small change, run the relevant local tests and check both `/` and `/en/` when UI text or navigation changes.

## Common edit paths

1. **Page content:** edit the route under `pages/`, its query under `lib/graphql-api/queries/`, and its feature components. Check the fields returned by the query before using them.
2. **New UI text:** add keys to the matching namespace in both locale folders. Make sure the route loads that namespace in `serverSideTranslations`.
3. **GraphQL schema change:** adjust the query or mutation, regenerate types when the schema is reachable, then update consumers. Do not edit `graphql/generated.ts` manually.
4. **Map behavior:** trace station adapters under `lib/air-pollution-map/api-hooks/` and display code under `components/HomePage/MapComponent/`. Development mode intentionally omits sensor fetches on the home page.
5. **Responsive styles:** inspect Tailwind classes, feature SCSS, and the existing mobile and desktop component variants before adding another global rule.

## Known documentation drift

The earlier README used `.env.local.example` and said development ran on port 9001. The tracked template is `.env.example`; the `dev` script runs on 9000, while `start` runs on 9001. This guide follows the executable configuration.
