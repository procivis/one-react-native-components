import { fn } from '@storybook/test';

export default {};

export enum CacheTypeBindingDto {
  DID_DOCUMENT = 'DID_DOCUMENT',
  JSON_LD_CONTEXT = 'JSON_LD_CONTEXT',
  STATUS_LIST_CREDENTIAL = 'STATUS_LIST_CREDENTIAL',
  VCT_METADATA = 'VCT_METADATA',
  JSON_SCHEMA = 'JSON_SCHEMA',
  TRUST_LIST = 'TRUST_LIST',
}

export class OneError extends Error {
  readonly operation: string;
  readonly code: string;
  readonly cause?: string;
  readonly originalError: Error;

  constructor(params: { operation: string; code: string; message: string; cause?: string; originalError: Error }) {
    super();
    this.operation = params.operation;
    this.code = params.code;
    this.message = params.message;
    this.originalError = params.originalError;
  }
}

export enum HistoryEntityTypeBindingEnum {
  KEY = 'KEY',
  DID = 'DID',
  CREDENTIAL = 'CREDENTIAL',
  CREDENTIAL_SCHEMA = 'CREDENTIAL_SCHEMA',
  PROOF = 'PROOF',
  PROOF_SCHEMA = 'PROOF_SCHEMA',
  ORGANISATION = 'ORGANISATION',
  BACKUP = 'BACKUP',
}

export enum HistoryActionBindingEnum {
  ACCEPTED = 'ACCEPTED',
  CREATED = 'CREATED',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
  ERRORED = 'ERRORED',
  ISSUED = 'ISSUED',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED',
  REQUESTED = 'REQUESTED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  RESTORED = 'RESTORED',
  SHARED = 'SHARED',
  IMPORTED = 'IMPORTED',
  CLAIMS_REMOVED = 'CLAIMS_REMOVED',
  RETRACTED = 'RETRACTED',
  ACTIVATED = 'ACTIVATED',
  WITHDRAWN = 'WITHDRAWN',
  REMOVED = 'REMOVED',
  UPDATED = 'UPDATED',
  REACTIVATED = 'REACTIVATED',
  CSR_GENERATED = 'CSR_GENERATED',
  EXPIRED = 'EXPIRED',
}

export enum DidTypeBindingEnum {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export enum CredentialStateBindingEnum {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  ERROR = 'ERROR',
}

export enum ProofStateBindingEnum {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  RETRACTED = 'RETRACTED',
  ERROR = 'ERROR',
}

export enum CredentialSchemaCodeTypeBindingDto {
  BARCODE = 'BARCODE',
  MRZ = 'MRZ',
  QR_CODE = 'QR_CODE',
}

export enum DataTypeEnum {
  String = 'STRING',
  Number = 'NUMBER',
  Date = 'DATE',
  File = 'FILE',
  Boolean = 'BOOLEAN',
  Object = 'OBJECT',
}

export enum FormatFeatureEnum {
  SelectiveDisclosure = 'SELECTIVE_DISCLOSURE',
  SupportsCredentialDesign = 'SUPPORTS_CREDENTIAL_DESIGN',
  RequiresSchemaId = 'REQUIRES_SCHEMA_ID',
}

export enum TrustEntityRoleBindingEnum {
  ISSUER = 'ISSUER',
  VERIFIER = 'VERIFIER',
  BOTH = 'BOTH',
}

export enum TrustEntityStateBindingEnum {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
  WITHDRAWN = 'WITHDRAWN',
  REMOVED_AND_WITHDRAWN = 'REMOVED_AND_WITHDRAWN',
}

export enum IdentifierTypeBindingEnum {
  KEY = 'KEY',
  DID = 'DID',
  CERTIFICATE = 'CERTIFICATE',
}

export enum IdentifierStateBindingEnum {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export enum WalletUnitStatusBindingEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  ERROR = 'ERROR',
}

export const initializeCore = fn;
