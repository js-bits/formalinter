/* eslint-disable no-param-reassign, no-console */
const fs = require('fs');

// const packageJson = require(`${process.cwd()}/package.json`);
// console.log('postinstall script', process.env.npm_package_scripts_lint);

// make sure we are within dependent project
if (process.env.INIT_CWD !== process.cwd()) {
  const dependentPackageJsonPath = `${process.env.INIT_CWD}/package.json`;

  // check that dependent project has package.json
  fs.access(dependentPackageJsonPath, err => {
    if (err) return;

    fs.readFile(dependentPackageJsonPath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        return;
      }
      // get dependent package.json
      const packageJson = JSON.parse(data);
      // ESLint requires this name to start with "eslint-config-" prefix
      const esLintConfigName = process.env.npm_package_name.replace(/\/[^/]+$/, '/eslint-config');
      const esLintConfigFileName = '.eslintrc.json';

      // prepare config
      if (!packageJson.prettier) {
        packageJson.prettier = `${process.env.npm_package_name}/.prettierrc.json`;
      }
      if (!packageJson.eslintConfig) {
        packageJson.eslintConfig = {
          extends: `${esLintConfigName}/${esLintConfigFileName}`,
        };
      }
      packageJson.scripts = packageJson.scripts || {};
      if (!packageJson.scripts.lint) {
        packageJson.scripts.lint = "eslint '**/*.{js,jsx}'";
        // npm doesn't return npm_package_scripts_lint while yarn works file
        // packageJson.scripts.lint = process.env.npm_package_scripts_lint;
      }

      const json = `${JSON.stringify(packageJson, null, '  ')}\n`;

      // update config
      fs.writeFile(dependentPackageJsonPath, json, error => {
        if (error) console.log(error);
      });
    });
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

fs.access(vscodeSettingsDirPath, err => {
  if (!err) {
    fs.readFile(vscodeSettingsJsonPath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
      } else {
        prepareVsCodeSettings(JSON.parse(data));
      }
    });
  } else {
    fs.mkdirSync(vscodeSettingsDirPath);
    prepareVsCodeSettings({});
  }
});
