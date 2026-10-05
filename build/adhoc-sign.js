// macOS : signature "ad hoc" (gratuite) pour que l'app s'ouvre sur les Mac Apple Silicon.
const { execFileSync } = require('child_process');
const path = require('path');

exports.default = async function (context) {
  if (context.electronPlatformName !== 'darwin') return;
  if (context.appOutDir.endsWith('-temp')) return; // étapes intermédiaires du build universel
  const app = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);
  execFileSync('codesign', ['--force', '--deep', '-s', '-', app], { stdio: 'inherit' });
};
