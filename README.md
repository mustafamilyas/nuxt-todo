# TODO App Nuxt

## Setup

1. In this project, we use yarn as our package manager. If you don't mind to not have the same dependencies as the project, you can use npm or pnpm and skip this step.

```bash
# npm
npm install -g yarn
```

2. Make sure to install the dependencies.

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Copy the `.env.example` file to `.env` and fill in the variables.

```bash
cp .env.example .env
```

## Development Server

1. Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

2. If you want to use mock server as API service, you can start the mock server on `http://localhost:9999` and don't forget to change the `NUXT_PUBLIC_API_BE` in `.env` file to `http://localhost:9999`.

```
// .env
NUXT_PUBLIC_API_BE=http://localhost:9999
```

```bash
# npm
npm run json-server

# pnpm
pnpm run json-server

# yarn
yarn json-server

# bun
bun run json-server
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
