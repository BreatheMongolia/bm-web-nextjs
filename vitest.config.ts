import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

function getAbsolutePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

export default defineConfig({
  test: {
    alias: {
      'assets/': getAbsolutePath('./assets/'),
      '@/components/': getAbsolutePath('./components/'),
      '@bm-web-nextjs/': getAbsolutePath('./'),
      'components/': getAbsolutePath('./components/'),
      'graphql/': getAbsolutePath('./graphql/'),
      'lib/': getAbsolutePath('./lib/'),
      'pages/': getAbsolutePath('./pages/'),
      'styles/': getAbsolutePath('./styles/'),
      '@/__tests__': getAbsolutePath('./tests'),
      '@/utils/': getAbsolutePath('./utils/'),
    },
    coverage: {
      include: ['components/HomePage/MapComponent/**/*.{ts,tsx}', 'lib/air-pollution-map/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: [['text', { skipFull: false }]],
    },
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.spec.{ts,tsx}'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['tests/integration/**/*.spec.{ts,tsx}'],
          environment: 'node',
        },
      },
    ],
  },
})
