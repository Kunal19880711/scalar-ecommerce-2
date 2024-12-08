# Learnings

## MUI Breakpoints
```jsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});

export default theme;
```

## Monorepo with pnpm and nix

1. Monorepo with pnpm and nx: [https://www.youtube.com/watch?v=ngdoUQBvAjo&ab_channel=Nx-SmartMonorepos-FastCI]
2. Install local packages

```sh
  pnpm add shared --filter app --workspace
```

2. To run a command across all packages

```sh
  pnpm run -r build
```

_OR_

```sh
  pnpm run --parallel -r build
```

## nx setup
1. On Setup
  - Run "pnpm exec nx run-many -t build" to run the build target for every project in the workspace. Run it again to replay the cached computation. https://nx.dev/features/cache-task-results
  - Run "pnpm exec nx graph" to see the graph of projects and tasks in your workspace. https://nx.dev/core-features/explore-graph
  - Learn more at https://nx.dev/getting-started/tutorials/npm-workspaces-tutorial.