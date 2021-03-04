# Easy and standard way to configure project linting/formatting

1. Add `@my/dev-config-eslint-prettier` as a dev dependency
1. Use shared ESLint and Prettier configs (see below)

```json
// package.json
{
  ...
  "devDependencies": {
    "@my/eslint-config-common": "git+ssh://git@bitbucket.org:petprojectos/dev-config-eslint-prettier.git#0.0.1",
  }
  ...
}
```

(!) NOTE 1: `eslint-config-` prefix is required by ESLint

(!) NOTE 2: All required dependencies will be installed automatically

## Using shared Prettier config

[https://prettier.io/docs/en/configuration.html#sharing-configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations)

```json
// package.json
{
  ...
  "prettier": "@my/eslint-config-common/.prettierrc.json"
}
```

## Using shared ESLint config

[https://eslint.org/docs/developer-guide/shareable-configs](https://eslint.org/docs/developer-guide/shareable-configs)

Shareable configs are simply npm packages that export a configuration object. Make sure the module name begins with `eslint-config-`, such as `eslint-config-myconfig`. npm scoped modules are also supported, by naming or prefixing the module with `@scope/eslint-config`, such as `@scope/eslint-config` or `@scope/eslint-config-myconfig`.

```json
// package.json
{
  ...
  "eslintConfig": {
    "extends": "@my/eslint-config-common/.eslintrc.json"
  }
}
```

## Integration with VS Code

1. Download the ESLint and Prettier extensions for VSCode.
1. Make sure Prettier formats on save. Configure Prettier in your settings in VSCode.

```
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    "json.format.enable": false
```

- [https://glebbahmutov.com/blog/configure-prettier-in-vscode/#format-json-files-with-prettier](https://glebbahmutov.com/blog/configure-prettier-in-vscode/#format-json-files-with-prettier)
- [https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [https://scotch.io/tutorials/linting-and-formatting-with-eslint-in-vs-code](https://scotch.io/tutorials/linting-and-formatting-with-eslint-in-vs-code)

### Recent issues with VS Code integration

- [Unable to resolve custom configuration module](https://github.com/prettier/prettier-vscode/issues/1289)
- [Extension not auto-fixing on Save](https://github.com/microsoft/vscode-eslint/issues/833)
- [Code Actions on Save for a particular source waits for all outstanding code action requests to complete](https://github.com/microsoft/vscode/issues/89745)
- [not working with eslint 6](https://github.com/prettier/prettier-vscode/issues/870#issuecomment-571163060)

## Known issues

- [Parsing error: Unexpected token](https://stackoverflow.com/questions/36001552/eslint-parsing-error-unexpected-token)
