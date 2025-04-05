import * as mime from 'mime-types';
import { extname } from 'path';

export function generateFileName(originalName: string): string {
  const name = originalName.split('.')[0];
  const fileExtName = extname(originalName);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  return `${name}-${randomName}${fileExtName}`;
}

export function getMimeType(originalName: string): string {
  return mime.lookup(originalName) || 'application/octet-stream';
}
