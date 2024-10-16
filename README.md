# Breathe Mongolia NextJS Website

This is the front-end project for the BreatheMongolia Website that is written in React/NextJS.

## Deployment Steps

TODO: Outline steps for deployment processes here.

## Setup Guide for Local Development

The below steps are the necessary steps for local development for this project.

### Step 1. Set up environment variables

Setup a local `.env.local` file (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `WORDPRESS_API_URL` to be the URL to your GraphQL endpoint in WordPress.

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=https://breathemon2.wpengine.com/graphql

# Only required if you want to enable preview mode
# WORDPRESS_AUTH_REFRESH_TOKEN=
# WORDPRESS_PREVIEW_SECRET=
```

### Step 2. Run Next.js in development mode

```bash
yarn install
yarn dev
```

The site should be up and running on [http://localhost:9001](http://localhost:9001)!
