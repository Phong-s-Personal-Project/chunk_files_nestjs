// file.utils.ts
import { join } from 'path';

export function getUploadsDirectory() {
  return join(__dirname, '..', '..', 'uploads');
}
