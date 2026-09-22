import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // .pristine holds byte-identical copies of the lab files, including the
    // test file. Without this exclusion every case is discovered and counted
    // twice, which would make the lab case counts meaningless.
    exclude: [...defaultExclude, '**/.pristine/**'],
  },
});
