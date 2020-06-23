module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'no-unused-vars': ['warn'],
        'array-bracket-spacing': ['error', 'always'],
        'no-underscore-dangle': 0,
    },
}
