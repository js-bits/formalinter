// const packageJson = require(`${process.cwd()}/package.json`);

// console.log('postinstall script', process.env.npm_package_scripts_lint);

const fs = require('fs');

// check the same package dir
if (process.env.INIT_CWD !== process.cwd()) {
  const dependantPackageJsonPath = `${process.env.INIT_CWD}/package.json`;

  fs.exists(dependantPackageJsonPath, exists => {
    if (exists) {
      fs.readFile(dependantPackageJsonPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const packageJson = JSON.parse(data);

          // prepare config
          if (!packageJson.prettier) {
            packageJson.prettier = `${process.env.npm_package_name}/.prettierrc.json`;
          }
          if (!packageJson.eslintConfig) {
            packageJson.eslintConfig = {
              extends: `${process.env.npm_package_name}/.eslintrc.json`,
            };
          }
          packageJson.scripts = packageJson.scripts || {};
          if (!packageJson.scripts.lint) {
            packageJson.scripts.lint = process.env.npm_package_scripts_lint;
          }

          const json = `${JSON.stringify(packageJson, null, '  ')}\n`;

          // update config
          fs.writeFile(dependantPackageJsonPath, json, error => {
            if (error) console.log(error);
          });
        }
      });
    }
  });
}

const vscodeSettingsDirPath = `${process.env.INIT_CWD}/.vscode`;
const vscodeSettingsJsonPath = `${vscodeSettingsDirPath}/settings.json`;
const prepareVsCodeSettings = settings => {
  if (settings['editor.formatOnSave'] === undefined) {
    settings['editor.formatOnSave'] = true;
  }
  settings['editor.codeActionsOnSave'] = settings['editor.codeActionsOnSave'] || {};
  if (settings['editor.codeActionsOnSave']['source.fixAll.eslint'] === undefined) {
    settings['editor.codeActionsOnSave']['source.fixAll.eslint'] = true;
  }
  if (settings['editor.codeActionsOnSave']['editor.action.formatDocument'] === undefined) {
    settings['editor.codeActionsOnSave']['editor.action.formatDocument'] = true;
  }

  const json = `${JSON.stringify(settings, null, '  ')}\n`;

  // update VS Code settings
  fs.writeFile(vscodeSettingsJsonPath, json, error => {
    if (error) console.log(error);
  });
};

fs.exists(vscodeSettingsDirPath, exists => {
  if (exists) {
    fs.readFile(vscodeSettingsJsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        prepareVsCodeSettings(JSON.parse(data));
      }
    });
  } else {
    fs.mkdirSync(vscodeSettingsDirPath);
    prepareVsCodeSettings({});
  }
});
