# Add basic formatting and linting to your project in one simple step

This package incudes standardized ESLint and Prettier configuration, automatically adds `lint` NPM script for source code linting and enables auto-formatting in [Visual Studio Code](https://code.visualstudio.com/).

## Installation

Install with npm:

```
npm install @js-bits/formalinter -D
```

Install with yarn:

```
yarn add @js-bits/formalinter -D
```

That's all you need to do.

## VS Code Integration

1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions for VSCode if you haven't already done so.
1. Restart VSCode to make sure that updated configuration is applied.
1. Enjoy 🎉

## Customization

Formalinter adds the following to your project's package.json

```
  "scripts": {
    ...
    "lint": "eslint '**/*.{js,jsx}'"
  },
  "prettier": "@js-bits/formalinter/.prettierrc.json",
  "eslintConfig": {
    "extends": "@js-bits/eslint-config-formalinter/.eslintrc.json"
  }
```

For further information regarding ESLint and Prettier customization please refer to sharable config docs:

- ESLint: [Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)
- Prettier: [Sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)

## Developer notes

(!) NOTE: `eslint-config-` prefix is required by ESLint

> Shareable configs are simply npm packages that export a configuration object. Make sure the module name begins with `eslint-config-`, such as `eslint-config-myconfig`. npm scoped modules are also supported, by naming or prefixing the module with `@scope/eslint-config`, such as `@scope/eslint-config` or `@scope/eslint-config-myconfig`.

### Useful links

- [https://glebbahmutov.com/blog/configure-prettier-in-vscode/#format-json-files-with-prettier](https://glebbahmutov.com/blog/configure-prettier-in-vscode/#format-json-files-with-prettier)
- [https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [https://scotch.io/tutorials/linting-and-formatting-with-eslint-in-vs-code](https://scotch.io/tutorials/linting-and-formatting-with-eslint-in-vs-code)

### VSCode integration issues

- [Unable to resolve custom configuration module](https://github.com/prettier/prettier-vscode/issues/1289)
- [Extension not auto-fixing on Save](https://github.com/microsoft/vscode-eslint/issues/833)
- [Code Actions on Save for a particular source waits for all outstanding code action requests to complete](https://github.com/microsoft/vscode/issues/89745)
- [not working with eslint 6](https://github.com/prettier/prettier-vscode/issues/870#issuecomment-571163060)

### Other issues

- [Parsing error: Unexpected token](https://stackoverflow.com/questions/36001552/eslint-parsing-error-unexpected-token)
