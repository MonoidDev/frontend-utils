import { preferImportWithTsPaths } from './prefer-import-with-ts-paths';
import { ruleTester } from './rule-tester';

const options = [
  {
    primaryDirnames: [
      'apis',
      'assets',
      'components',
      'data',
      'hooks',
      'models',
      'pages',
      'store',
      'styles',
      'utils',
    ],
  },
];

ruleTester.run('prefer-import-with-ts-paths', preferImportWithTsPaths, {
  valid: [
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from 'react';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@hooks/queries/useFoo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@apis/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@assets/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@components/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@styles/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@styles';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@models/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@data/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@utils/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '@store/foo';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from './common';",
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../common';",
    },
  ],
  invalid: [
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../hooks/queries/useFoo';",
      output: "import {} from '@hooks/queries/useFoo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../apis/fooApis';",
      output: "import {} from '@apis/fooApis';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../assets/foo';",
      output: "import {} from '@assets/foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../components/Foo';",
      output: "import {} from '@components/Foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../styles/foo';",
      output: "import {} from '@styles/foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../styles';",
      output: "import {} from '@styles';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../models/foo';",
      output: "import {} from '@models/foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../data/foo';",
      output: "import {} from '@data/foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../utils/foo';",
      output: "import {} from '@utils/foo';",
      errors: [{ messageId: 'default' }],
    },
    {
      filename: 'src/Foo.tsx',
      options,
      code: "import {} from '../../store/foo';",
      output: "import {} from '@store/foo';",
      errors: [{ messageId: 'default' }],
    },
  ],
});
