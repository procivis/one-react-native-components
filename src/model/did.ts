export declare enum DidTypeEnum {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}
export interface DidListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  did: string;
  didType: DidTypeEnum;
  didMethod: string;
  deactivated: boolean;
}
