import { isAbsolute, join, dirname } from 'path';

import type { Rule } from 'eslint';

const ERROR_MESSAGE = 'Please do not use relative path, instead use a path using ts-paths';

function isRelative(filename: string): boolean {
  return !isAbsolute(filename);
}

function extractHierarchicalPart(filename: string): string {
  return dirname(filename).replace(/[^.]*$/, '');
}

function isUsingTsPaths(filename: string): boolean {
  return filename.startsWith('@');
}

function goThroughPrimaryDirectory(baseDir: string, dirnames: string[], filename: string) {
  return dirnames.some((dirname) => filename.startsWith(join(baseDir, dirname)));
}

export const preferImportWithTsPaths: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    messages: {
      default: ERROR_MESSAGE,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          baseDir: {
            type: 'string',
          },
          primaryDirnames: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: [],
          },
        },
      },
    ],
  },
  create: (context) => {
    return {
      ImportDeclaration(node) {
        if (typeof node.source.value !== 'string') return;
        if (!isRelative(node.source.value)) return;
        // Probably an external module such as react and react-use/lib/useDebounce
        if (!/^\.{1,2}\//.test(node.source.value)) return;

        const options = context.options[0] ?? {};
        const baseDir = options.baseDir;
        const primaryDirnames = options.primaryDirnames;
        if (!Array.isArray(primaryDirnames) || primaryDirnames.length === 0) return;

        const hierarchycalPart = extractHierarchicalPart(node.source.value);
        const moduleFilenameFromBaseDir = join(
          dirname(context.getFilename()),
          hierarchycalPart,
          node.source.value.replace(hierarchycalPart, '').slice(1),
        ).replace(context.getCwd(), '');

        if (
          !isUsingTsPaths(node.source.value) &&
          goThroughPrimaryDirectory(baseDir, primaryDirnames, moduleFilenameFromBaseDir)
        ) {
          context.report({
            node,
            messageId: 'default',
            fix: (fixer) => {
              if (typeof node.source.value !== 'string') return null;
              if (!Array.isArray(node.source?.range)) return null;

              const fixed = moduleFilenameFromBaseDir.replace(baseDir, '').replace(/^\/?/, '@');
              return fixer.replaceTextRange(
                [node.source.range[0] + 1, node.source.range[1] - 1],
                fixed,
              );
            },
          });
        }
      },
    };
  },
};
