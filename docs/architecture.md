# Architecture map

## Request and rendering flow

```text
Browser -> pages/ route -> getStaticProps / getStaticPaths
                         -> lib/graphql-api/queries/* -> fetchAPI -> WordPress GraphQL
                         -> components/* -> Tailwind + styles/*
```

The site uses the Next.js Pages Router. `pages/_app.tsx` wraps every page in the shared layout, translation provider, metadata, and progress bar. It also calls `getProjectUrls()` in `MyApp.getInitialProps`, so the shared layout has a WordPress dependency in addition to page-level data fetching.

Most routes statically fetch WordPress data and specify a `revalidate` interval. The detail routes under `pages/news/`, `pages/action/`, and `pages/policy/` generate localized slug paths. Inspect each route's fallback and `notFound` handling before changing content loading. `pages/search.tsx` exports a function named `getStaticProps` (despite a `GetServerSideProps` annotation) and builds search results from fetched WordPress collections.

## Where to look

| Concern | Main location | Notes |
| --- | --- | --- |
| Routes and page data | `pages/` | Page entry points, metadata, translation namespaces, regeneration |
| Page UI | `components/HomePage/`, `components/NewsPage/`, `components/TakeActionPage/`, `components/PolicyPage/`, `components/AboutUsPage/` | Feature-oriented components |
| Shared UI | `components/layout/`, `components/generic/`, `components/Cards/` | Header, footer, reusable pieces |
| WordPress access | `lib/graphql-api/api.ts`, `lib/graphql-api/queries/`, `lib/graphql-api/mutations/` | GraphQL strings and a shared POST helper |
| Generated GraphQL types | `graphql/generated.ts`, `codegen.yaml` | Generated from a configured remote schema |
| Air quality data | `lib/air-pollution-map/api-hooks/`, `components/HomePage/MapComponent/` | Sensor fetching, normalization, map display |
| Languages | `next-i18next.config.js`, `public/locales/{mn,en}/`, `lib/utils/getTranslated.ts` | Mongolian default; translated JSON and WordPress fields |
| Styling and assets | `styles/`, `tailwind.config.js`, `assets/`, `public/` | Global SCSS, utility classes, bundled and public assets |
| Tests | `tests/e2e/`, component `__tests__/`, `playwright.config.ts`, `jest.config.ts` | Browser and component tests |
| WordPress backend | `backend/` (git submodule of BreatheMongolia/wordpress) | Custom GraphQL mutations, ACF fields in `wp-content/themes/breathemongolia/functions.php` |

## Data and language details

`fetchAPI` posts GraphQL operations to `WORDPRESS_API_URL` and optionally attaches `WORDPRESS_AUTH_REFRESH_TOKEN`. Query modules shape the result for their pages; components often receive those objects as props. The action pledge and feedback flows use GraphQL mutations, so those UI controls write to WordPress.

The home page combines WordPress content with PurpleAir, OpenAQ, and AirVisual station data. In development, its `getStaticProps` skips those sensor calls to avoid using API credits. Other WordPress calls still run. Mapbox uses `NEXT_PUBLIC_MAPBOX_TOKEN` in the browser.

The router locales are `mn` and `en`, with `mn` as default and automatic locale detection disabled. Translation JSON is split into namespaces such as `nav`, `home`, and `policy`; pages list the namespaces they load in `serverSideTranslations`. Some WordPress fields have separate English and Mongolian values selected by `getTranslated`. Pass the route locale during server rendering because browser `localStorage` is unavailable there.

## Operational dependencies

The WordPress backend lives in the `backend/` git submodule (https://github.com/BreatheMongolia/wordpress). After cloning this repo, run `git submodule update --init` to fetch it. The local dev site (Local by Flywheel) at `C:\Users\Tugu\Local Sites\breathemon\app\public` serves the same code; the submodule is the source of truth for review and versioning. Custom backend behavior (pledge and feedback mutations, `totalPledges`/`totalUserFeedbacks` fields, admin news filters) is in `backend/wp-content/themes/breathemongolia/functions.php`.

`next.config.js` requires `WORDPRESS_API_URL` even to load the Next configuration and derives an allowed image hostname from it. `codegen.yaml` points at a remote development WordPress schema. A production build may need live WordPress content, and home-page generation may contact sensor services. Keep those dependencies in mind when interpreting local or CI failures.
