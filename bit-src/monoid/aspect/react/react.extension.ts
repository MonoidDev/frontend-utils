import { config as monoidPrettierConfig } from '@monoid/utils.prettier.config';
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { PrettierConfigTransformer } from '@teambit/prettier';
import { ReactAspect, ReactMain } from '@teambit/react';
import { TsConfigTransformer, TypescriptConfigMutator } from '@teambit/typescript';

const tsTransformerForProd: TsConfigTransformer = (config: TypescriptConfigMutator) => {
  config.mergeTsConfig({
    compilerOptions: {
      /**
       * In the case of Next.js, using ES2021 is complexity yet.
       * However, Vite can use it without problems.
       */
      target: 'ES2015', // 'ES2021'
      lib: ['es2021', 'DOM', 'DOM.Iterable'],
      jsx: 'react-jsx',
      esModuleInterop: false,
    },
  });
  return config;
};

// const tsTransformerForDev: TsConfigTransformer = (
//   config: TypescriptConfigMutator
// ) => {
//   config.mergeTsConfig({
//     compilerOptions: {
//       /**
//        * In the case of Next.js, using ES2021 is complexity yet.
//        * However, Vite can use it without problems.
//        */
//       target: 'ES2015', // 'ES2021',
//       lib: ['DOM', 'ES6', 'DOM.Iterable'],
//       jsx: 'react-jsxdev',
//       esModuleInterop: false,
//     },
//   });
//   return config;
// };

const prettierTransformer: PrettierConfigTransformer = (config) => {
  Object.entries(monoidPrettierConfig).forEach(([key, value]) => {
    config.setKey(key, value);
  });
  return config;
};

export class ReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const reactEnv = react.compose([
      react.useTypescript({
        buildConfig: [tsTransformerForProd],
        devConfig: [tsTransformerForProd],
      }),
      react.usePrettier({
        transformers: [prettierTransformer],
      }),
      react.overrideJestConfig(require.resolve('./jest/jest.config')),
    ]);

    envs.registerEnv(reactEnv);

    return new ReactExtension(react);
  }
}
