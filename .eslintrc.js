module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.tsx', '.jsx'],
            },
        },
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    rules: {
        indent: ['error', 4],
        'no-unused-vars': ['warn'],
        'no-underscore-dangle': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'prettier/prettier': 'error',
    },
};
