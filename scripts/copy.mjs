import { copyFile } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

['README.md', 'LICENSE'].forEach(file => {
  copyFile(
    resolve(DIRNAME, '..', file),
    resolve(DIRNAME, '..', 'dist', 'ngx-fluent-form', file),
    error => error && console.log(error)
  );
});