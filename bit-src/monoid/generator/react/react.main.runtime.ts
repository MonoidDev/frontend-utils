import { MainRuntime } from '@teambit/cli';
import { GeneratorMain, GeneratorAspect, ComponentContext } from '@teambit/generator';

import { ReactAspect } from './react.aspect';

export class ReactMain {
  static slots = [];
  static dependencies = [GeneratorAspect];
  static runtime = MainRuntime;
  static async provider([generator]: [GeneratorMain]) {
    generator.registerComponentTemplate([
      {
        name: 'component',
        description: 'create a React component',
        generateFiles: (context: ComponentContext) => {
          return [
            {
              relativePath: 'index.ts',
              isMain: true,
              content: `export { ${context.namePascalCase} } from './${context.name}';
export type { ${context.namePascalCase}Props } from './${context.name}.type';
`,
            },
            {
              relativePath: `${context.name}.type.ts`,
              content: `export interface ${context.namePascalCase}Props {
}
`,
            },
            {
              relativePath: `${context.name}.tsx`,
              content: `import type { VFC } from 'react';
import type { ${context.namePascalCase}Props } from './${context.name}.type';

export const ${context.namePascalCase}: VFC<${context.namePascalCase}Props> = () => {
  return (
    <div>${context.namePascalCase}</div>
  );
}`,
            },
            {
              relativePath: `${context.name}.docs.mdx`,
              content: `---
description: ''
labels: ['component', 'ui']
---

import { ${context.namePascalCase} } from './${context.name}';
`,
            },
            {
              relativePath: `${context.name}.composition.tsx`,
              content: `// import '@monoid/utils.non-runtime-css.PROJECT_NAME';
import { ${context.namePascalCase} } from './${context.name}';

export const Basic${context.namePascalCase}  = () => (
  <${context.namePascalCase} />
);
`,
            },
            {
              relativePath: `${context.name}.test.tsx`,
              content: `import { render } from '@testing-library/react';
import { Basic${context.namePascalCase} } from './${context.name}.composition';

it('should render with the text of the component name', () => {
  const { getByText } = render(<Basic${context.namePascalCase} />);
  const rendered = getByText('${context.namePascalCase}');
  expect(rendered).toBeTruthy();
});
`,
            },
          ];
        },
      },
    ]);

    return new ReactMain();
  }
}

ReactAspect.addRuntime(ReactMain);
