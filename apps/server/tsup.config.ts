import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  outDir: 'dist',
  target: 'node20',
  bundle: true,
  // Bundle the shared workspace package inline — it's TypeScript source, not a compiled lib
  noExternal: ['@lucky-spin-lab/shared'],
  external: ['express', 'cors', 'express-rate-limit', 'zod'],
  sourcemap: false,
  clean: true,
});
