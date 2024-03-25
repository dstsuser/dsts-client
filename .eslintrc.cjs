module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 'react/react-in-jsx-scope': 'off',
    // 'import/extensions': 'off',
    // "linebreak-style": ["error", "windows"],
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
    // "eqeqeq": "off",
    // "no-unused-expressions": "off"
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
