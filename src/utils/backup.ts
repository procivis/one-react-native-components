import { generateUUID } from './uuid';

export const getBackupFileName = (): string => {
  return `procivis-one-backup-${generateUUID()}.zip`;
};
