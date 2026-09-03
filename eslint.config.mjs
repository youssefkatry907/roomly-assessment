// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'eslint.config.mjs'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Reading the system clock outside the Clock port makes behaviour untestable.
      'no-restricted-syntax': [
        'error',
        {
          selector: "NewExpression[callee.name='Date'][arguments.length=0]",
          message: 'Do not read the system clock directly. Inject the Clock port (CLOCK).',
        },
        {
          selector: "CallExpression[callee.object.name='Date'][callee.property.name='now']",
          message: 'Do not read the system clock directly. Inject the Clock port (CLOCK).',
        },
      ],
    },
  },
  {
    // The hexagon boundary. The domain layer is pure TypeScript: it knows nothing
    // about the framework, the transport, the configuration or any adapter.
    files: ['src/booking/domain/**/*.ts'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@nestjs/*'], message: 'The domain layer must not depend on NestJS.' },
            { group: ['class-validator', 'class-transformer', 'joi', 'express'],
              message: 'The domain layer must not depend on transport or validation libraries.' },
            { group: ['**/infrastructure/**', '**/presentation/**', '**/application/**', '**/config/**'],
              message: 'The domain layer must not import from an outer layer.' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/booking/application/**/*.ts'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/infrastructure/**', '**/presentation/**'],
              message: 'The application layer depends on ports, never on adapters.' },
          ],
        },
      ],
    },
  },
  {
    files: ['test/**/*.ts', 'src/shared/clock/system.clock.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },
);
