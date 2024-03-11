module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/no-unknown-property": 0,
    "react/no-unescaped-entities": 0,
  },
};
