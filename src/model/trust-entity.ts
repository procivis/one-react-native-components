import { DidListItem } from './did';
import { ListQuery, SortDirection } from './query';

export declare enum SortableTrustAnchorColumnEnum {
  NAME = 'NAME',
  CREATED_DATE = 'CREATED_DATE',
  TYPE = 'TYPE',
}
export declare enum ExactTrustAnchorFilterColumnEnum {
  NAME = 'NAME',
  TYPE = 'TYPE',
}
export interface TrustAnchorListQuery extends Omit<ListQuery, 'organisationId'> {
  sort?: SortableTrustAnchorColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: ExactTrustAnchorFilterColumnEnum[];
  type?: string;
  isPublisher?: boolean;
}
export type CreateTrustAnchorRequest = {
  name: string;
  type: string;
} & (
  | {
      isPublisher: true;
      publisherReference?: never;
    }
  | {
      isPublisher?: false;
      publisherReference: string;
    }
);
export interface CreateTrustEntityRequest {
  name: string;
  logo?: string;
  website?: string;
  termsUrl?: string;
  privacyUrl?: string;
  role: TrustEntityRoleEnum;
  state: TrustEntityStateEnum;
  trustAnchorId: string;
  didId: string;
}
export interface TrustEntityListQuery {
  sort?: SortableTrustEntityColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: ExactTrustEntityFilterColumnEnum[];
  type?: string;
  isPublisher?: boolean;
}
export declare enum SortableTrustEntityColumnEnum {
  NAME = 'NAME',
  ROLE = 'ROLE',
}
export declare enum ExactTrustEntityFilterColumnEnum {
  NAME = 'NAME',
}
export interface CreateRemoteTrustEntityRequest extends Omit<CreateTrustEntityRequest, 'trustAnchorId' | 'state'> {
  trustAnchorId?: string;
}
export interface TrustAnchor {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  type: string;
  isPublisher: boolean;
  publisherReference: string;
}
export interface TrustAnchorListItem extends TrustAnchor {
  entities: number;
}
export interface TrustEntity {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  logo?: string;
  website?: string;
  termsUrl?: string;
  privacyUrl?: string;
  role: TrustEntityRoleEnum;
  state: TrustEntityStateEnum;
  did: DidListItem;
  trustAnchor: TrustAnchor;
}
export declare enum TrustEntityRoleEnum {
  ISSUER = 'ISSUER',
  VERIFIER = 'VERIFIER',
  BOTH = 'BOTH',
}
export declare enum TrustEntityStateEnum {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
  WITHDRAWN = 'WITHDRAWN',
  REMOVED_AND_WITHDRAWN = 'REMOVED_AND_WITHDRAWN',
}
