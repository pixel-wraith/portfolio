import antfu from '@antfu/eslint-config';

export default antfu({
    type: 'app',
    formatters: true,
    typescript: true,
    svelte: true,
    jsonc: true,
    yaml: false,
    ignores: [
        '**/*.md',
        '**/*.yml',
        '**/*.yaml',
        '**/migrations/*',
        '**/fixtures/*',
        'README.md',
    ],
    stylistic: {
        'indent': 4,
        'semi': true,
        'quotes': 'single',
        'multiline-ternary': 'always-multiline',
    },
}, {
    rules: {
        'ts/no-redeclare': 'off',
        'ts/consistent-type-definitions': 'off',
        'antfu/consistent-chaining': 'off',
        'no-console': ['error', { allow: [''] }],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'MemberExpression[object.name="console"]',
                message: 'Use the logger instead of console methods.',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: '@/db',
                        importNames: ['db'],
                        message: 'Direct use of \'db\' is forbidden. Use DB.tenantTransaction() instead.',
                    },
                ],
            },
        ],
        'antfu/no-top-level-await': ['off'],
        'antfu/top-level-function': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],
        'style/brace-style': ['off'],
        'style/eol-last': ['off'],
        'style/multiline-ternary': ['error', 'always-multiline'],
        'style/no-tabs': ['off'],
        'style/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
        'perfectionist/sort-imports': ['error', {
            internalPattern: ['^@/'],
        }],
        'unicorn/filename-case': ['error', {
            case: 'kebabCase',
            ignore: ['README.md'],
        }],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    },
}, {
    files: ['**/*.svelte'],
    rules: {
        'quotes': 'off',
        '@stylistic/quotes': 'off',
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],
        'style/multiline-ternary': ['error', 'always-multiline'],
        'style/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
        'style/quotes': 'off',
        'style/semi': 'off',
        'svelte/html-quotes': 'off',
        // Route filenames like +page.svelte should not be enforced
        'unicorn/filename-case': 'off',
    },
});
